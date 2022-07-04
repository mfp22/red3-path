import React, { useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";
import { buildResultAtom, curveParams, showOptions, svgHeight, svgWidth } from "@/store/store";
import { debounce } from "@/utils/debounce";
import { clamp, withDigits } from "@/utils/numbers";
import { pointer } from "@/utils/pointer";
import { ControlPoint, CpType, XY } from "@/utils/svg-path-cpts";
import { useDrag } from "@use-gesture/react";

const enum SIZES {
    rawRadius = 5,                  // raw point radius
    cptRadius = 9,                  // smooth point radius
    stepRadius = 2,                 // step point radius

    handleWidth = 8,                // square control point width
    handleRadius = 4,               // circle control point radius
    handleTextOfsX = cptRadius + 3, // control point x text offset
    handleTextOfsY = 0,             // control point y text offset

    lineLowerWidth = 4,             // lower line width
    lineUpperWidth = 2,             // upper line width
}

export const enum COLORS {
    rawStrk = '#2b2bff',          // raw point stroke
    rawFill = '#0085ff80',        // raw point fill

    cptStrk = '#b83a00',          // smooth point stroke
    cptFill = '#ffa50080',        // smooth point fill

    handleStrk = '#b83a00',       // circle control point handle stroke
    handleFill = '#ffa50080',     // circle control point handle fill

    stepStrk = '#ff0000',         // step point stroke
    stepFill = '#ff000080',       // step point fill

    lineLowerStrk = '#ff842280',  // lower line stroke
    lineUpperStrk = '#ffdb0080',  // upper line stroke
}

function RenderRawPoints({ pts, ...rest }: { pts: [number, number][]; } & React.SVGAttributes<SVGElement>) {
    rest = { stroke: COLORS.rawStrk, fill: COLORS.rawFill, ...rest };
    return (
        <g {...rest}>
            {pts.map(([x, y], idx) => (
                <circle
                    cx={x}
                    cy={y}
                    r={SIZES.rawRadius}
                    key={idx}
                >
                    <title>Index: {idx} Location: {withDigits(x, 0)} x {withDigits(y, 0)}</title>
                </circle>
            ))}

            {/*
            {pts.map(([x, y], index) => (
                <React.Fragment key={index}>
                    <circle
                        cx={x}
                        cy={y}
                        {...rest}
                    >
                        <title>{index}: x:{x} y: {y}</title>
                    </circle>
                    <text
                        x={x + 7}
                        y={y}
                        fontSize="7" stroke="none"
                    >
                        {index}
                    </text>
                </React.Fragment>
            ))}
            */}
        </g>
    );
}

function RenderCpts({ pts, ...rest }: { pts: XY[]; } & React.SVGAttributes<SVGElement>) {
    rest = { stroke: COLORS.cptStrk, fill: COLORS.cptFill, r: SIZES.cptRadius, ...rest }; // orange 50%
    return (
        <g>
            {pts.map(({ x, y }, index) => (
                <React.Fragment key={index}>
                    <circle
                        cx={x}
                        cy={y}
                        {...rest}
                    >
                        <title>Index: {index}: Location: {withDigits(x, 0)} x {withDigits(y, 0)}</title>
                    </circle>

                    <text
                        x={x + SIZES.handleTextOfsX}
                        y={y + SIZES.handleTextOfsY}
                        fontSize="7"
                        stroke="none"
                    >
                        {index}
                    </text>
                </React.Fragment>
            ))}
        </g>
    );
}

function RenderCptsHandlesSquares({ cpts, ...rest }: { cpts: ControlPoint[]; } & React.SVGAttributes<SVGElement>) {
    rest = { stroke: COLORS.handleStrk, fill: COLORS.handleFill, strokeWidth: '1', ...rest };
    return (
        <g {...rest}>
            {cpts.map((cpt, index) => (
                <React.Fragment key={index}>
                    <rect
                        x={cpt.cp.x - SIZES.handleWidth / 2}
                        y={cpt.cp.y - SIZES.handleWidth / 2}
                        width={SIZES.handleWidth}
                        height={SIZES.handleWidth}
                        fill={cpt.t === CpType.computed ? 'none' : rest.fill}
                    >
                        <title>Command {cpt.n}: {cpt.i}: Location: {withDigits(cpt.cp.x, 0)} x {withDigits(cpt.cp.y, 0)}</title>
                    </rect>

                    <line
                        x1={cpt.pt.x}
                        y1={cpt.pt.y}
                        x2={cpt.cp.x}
                        y2={cpt.cp.y}
                        strokeDasharray="2 2"
                    />
                </React.Fragment>
            ))}
        </g>
    );
}

function RenderCptsHandlesCyrcles({ cpts, ...rest }: { cpts: ControlPoint[]; } & React.SVGAttributes<SVGElement>) {
    rest = { stroke: COLORS.handleStrk, fill: COLORS.handleFill, strokeWidth: '1', ...rest };
    return (
        <g {...rest}>
            {cpts.map((cpt, index) => (
                <React.Fragment key={index}>
                    <circle
                        cx={cpt.cp.x}
                        cy={cpt.cp.y}
                        r={SIZES.handleRadius}
                        fill={cpt.t === CpType.computed ? 'none' : rest.fill}
                    >
                        <title>Command {cpt.n}: {cpt.i}: x:{withDigits(cpt.cp.x)} y: {withDigits(cpt.cp.y)}</title>
                    </circle>
                    <line
                        x1={cpt.pt.x}
                        y1={cpt.pt.y}
                        x2={cpt.cp.x}
                        y2={cpt.cp.y}
                        strokeDasharray="2 2"
                    />
                </React.Fragment>
            ))}
        </g>
    );
}

function RenderStepRawPoints({ pts, ...rest }: { pts: [number, number][]; } & React.SVGAttributes<SVGElement>) {
    rest = { stroke: COLORS.stepStrk, fill: COLORS.stepFill, ...rest };
    return (
        <g {...rest}>
            {pts.map(([x, y], idx) => (
                <circle
                    cx={x}
                    cy={y}
                    r={SIZES.stepRadius}
                    key={idx}
                >
                    <title>Index: {idx} Location: {withDigits(x, 0)} x {withDigits(y, 0)}</title>
                </circle>
            ))}
        </g>
    );
}

export function Editor1_Canvas() {
    const svgRef = React.useRef<SVGSVGElement>(null);

    const [points, setPoints] = useAtom(curveParams.pointsAtom);

    const showLine = useAtomValue(showOptions.showLineAtom);
    const showRaw = useAtomValue(showOptions.showRawAtom);
    const showPts = useAtomValue(showOptions.showPtsAtom);
    const showCtr = useAtomValue(showOptions.showCtrAtom);

    const addPoint = useCallback(debounce((pt: [number, number]) => setPoints(prev => [...prev, pt]), 50), []);

    const bind = useDrag(({ event, dragging, buttons }) => {
        //if (event.event.type === 'pointerdown') {}

        if (dragging && buttons === 1) {
            // let pt = pointer(event, ref.current).map(coord => +withDigits(coord, 0)) as [number, number];
            let pt = pointer(event as PointerEvent, svgRef.current);
            pt[0] = clamp(pt[0], SIZES.cptRadius, svgWidth - SIZES.cptRadius);
            pt[1] = clamp(pt[1], SIZES.cptRadius, svgHeight - SIZES.cptRadius);
            addPoint(pt);
        }

        // if (event.event.type === 'pointerup') {
        //     if (points.length > 1) {
        //         setPoints(prev => [...prev]);
        //     }
        // }
    });

    const { path, controlPoints, stepPoints, } = useAtomValue(buildResultAtom);

    return (
        <div className="col-span-1 lg:col-span-2">
            <svg ref={svgRef} {...bind()} viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-full bg-primary-300 border-primary-600 border-opacity-50 border-8 touch-none cursor-tm-point"
            >
                {showPts && <RenderCpts pts={controlPoints.points} />}
                {showCtr && <RenderCptsHandlesSquares cpts={controlPoints.controls} />}
                {showRaw && <RenderRawPoints pts={points} />}
                {showLine &&
                    <>
                        <path fill="none" stroke={COLORS.lineLowerStrk} strokeWidth={SIZES.lineLowerWidth} d={path} />
                        <path fill="none" stroke={COLORS.lineUpperStrk} strokeWidth={SIZES.lineUpperWidth} d={path} />
                    </>
                }

                <RenderStepRawPoints pts={stepPoints} />
            </svg>
        </div>
    );
}
