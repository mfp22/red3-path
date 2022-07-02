import React from "react";
//import Tick from "@pqina/flip";
//import Tick from '../lib/flip-old';
import Tick from './Cards/flip-old';
import "./flip.scss";

function createTickAsNoneReactBusiness(alignRight: boolean) {
    const elTick = document.createElement('div');
    elTick.className = "tick";

    const elFlex = document.createElement('div');
    elFlex.className = "flex";
    alignRight && (elFlex.style.justifyContent = 'flex-end');
    elFlex.dataset.repeat = 'true';
    elFlex.ariaHidden = 'true';

    const elSpan = document.createElement('span');
    elSpan.dataset.view = "flip";

    elFlex.appendChild(elSpan);
    elTick.appendChild(elFlex);
    return elTick;
}

export default function Flip({ value, alignRight = false }: { value: number; alignRight?: boolean; }) {
    const _tickRef = React.useRef<HTMLDivElement>(null);
    const _tickInstance = React.useRef<any>(null);

    React.useEffect(() => {
        if (!_tickRef.current) {
            return;
        }

        const elTick = createTickAsNoneReactBusiness(alignRight);
        _tickRef.current.appendChild(elTick);
        _tickInstance.current = Tick.DOM.create(elTick, { value: value });

        return () => Tick.DOM.destroy(elTick);
    }, []);

    React.useEffect(() => {
        _tickInstance.current && (_tickInstance.current.value = value);
    }, [value]);

    return (
        <div ref={_tickRef}></div>
    );
}
