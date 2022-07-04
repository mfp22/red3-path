import React, { useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";
import { buildResultAtom, curveParams, showOptions, svgHeight, svgWidth } from "@/store/store";
import { debounce } from "@/utils/debounce";
import { clamp, withDigits } from "@/utils/numbers";
import { pointer } from "@/utils/pointer";
import { ControlPoint, CpType, XY } from "@/utils/svg-path-cpts";
import { useDrag } from "@use-gesture/react";

const enum SIZES {
    rRaw = 5,               // raw point radius
    rCpt = 13,              // smooth point radius
    wHandle = 8,            // square control point width
    rHandle = 4,            // circle control point radius
    handleTextOfsX = rCpt + 3,    // control point x text offset
    handleTextOfsY = 0,     // control point y text offset
    widthLineLower = 2,     // lower line width
    widthLineUpper = 1,     // upper line width
}

export const enum COLORS {
    strkRaw = '#2b2bff',         // raw point stroke
    fillRaw = '#0085ff80',       // raw point fill

    strkCpt = '#b83a00',         // smooth point stroke
    fillCpt = '#ffa50080',       // smooth point fill

    strkStep = '#2b2bff',        // step point stroke
    fillStep = '#ff000080',      // step point fill

    strkHandle = '#e00000',      // circle control point handle stroke
    fillHandle = '#ff000066',    // circle control point handle fill

    strkLineLower = '#ff842280', // lower line stroke
    strkLineUpper = '#ffdb0080', // upper line stroke
}

function RenderRawPoints({ pts, ...rest }: { pts: [number, number][]; } & React.SVGAttributes<SVGElement>) {
    rest = { stroke: COLORS.strkRaw, fill: COLORS.fillRaw, ...rest };
    return (
        <g {...rest}>
            {pts.map(([x, y], idx) => (
                <circle
                    cx={x}
                    cy={y}
                    r={SIZES.rRaw}
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

function RenderStepRawPoints({ pts, ...rest }: { pts: [number, number][]; } & React.SVGAttributes<SVGElement>) {
    rest = { stroke: COLORS.strkStep, fill: COLORS.fillStep, ...rest };
    return (
        <g {...rest}>
            {pts.map(([x, y], idx) => (
                <circle
                    cx={x}
                    cy={y}
                    r={SIZES.rRaw + 5}
                    key={idx}
                >
                    <title>Index: {idx} Location: {withDigits(x, 0)} x {withDigits(y, 0)}</title>
                </circle>
            ))}
        </g>
    );
}

function RenderCpts({ pts, ...rest }: { pts: XY[]; } & React.SVGAttributes<SVGElement>) {
    rest = { stroke: COLORS.strkCpt, fill: COLORS.fillCpt, r: SIZES.rCpt, ...rest }; // orange 50%
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
    rest = { stroke: COLORS.strkHandle, fill: COLORS.fillHandle, strokeWidth: '1', ...rest };
    return (
        <g {...rest}>
            {cpts.map((cpt, index) => (
                <React.Fragment key={index}>
                    <rect
                        x={cpt.cp.x - SIZES.wHandle / 2}
                        y={cpt.cp.y - SIZES.wHandle / 2}
                        width={SIZES.wHandle}
                        height={SIZES.wHandle}
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
    rest = { stroke: COLORS.strkHandle, fill: COLORS.fillHandle, strokeWidth: '1', ...rest };
    return (
        <g {...rest}>
            {cpts.map((cpt, index) => (
                <React.Fragment key={index}>
                    <circle
                        cx={cpt.cp.x}
                        cy={cpt.cp.y}
                        r={SIZES.rHandle}
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
            pt[0] = clamp(pt[0], SIZES.rCpt, svgWidth - SIZES.rCpt);
            pt[1] = clamp(pt[1], SIZES.rCpt, svgHeight - SIZES.rCpt);
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
                        <path fill="none" stroke={COLORS.strkLineLower} strokeWidth={SIZES.widthLineLower} d={path} />
                        <path fill="none" stroke={COLORS.strkLineUpper} strokeWidth={SIZES.widthLineUpper} d={path} />
                    </>
                }

                <RenderStepRawPoints pts={stepPoints} />
            </svg>
        </div>
    );
}
