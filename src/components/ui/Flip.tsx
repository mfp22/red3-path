import React from "react";
//import Tick from "@pqina/flip";
//import Tick from '../lib/flip-old';
import Tick from '../lib/flip-old';
import "./flip.scss";

// export default class Flip extends React.Component {
//   constructor(props) {
//     super(props);
//     this._tickRef = React.createRef();
//   }

//   componentDidMount() {
//     this._tickInstance = Tick.DOM.create(this._tickRef.current, {
//       value: this.props.value
//     });
//   }

//   componentDidUpdate() {
//     if (!this._tickInstance) return;
//     this._tickInstance.value = this.props.value;
//   }

//   componentWillUnmount() {
//     if (!this._tickInstance) return;
//     Tick.DOM.destroy(this._tickRef.current);
//   }

//   render() {
//     return (
//       <div ref={this._tickRef} className="tick">
//         <div data-repeat="true" aria-hidden="true">
//           <span data-view="flip">Tick</span>
//         </div>
//       </div>
//     );
//   }
// }

export default function Flip({ value }: { value: number; }) {
    const _tickRef = React.useRef<HTMLDivElement>(null);
    const _tickInstance = React.useRef<any>(null);

    React.useEffect(() => {
        console.log('mount', {ref: _tickRef.current, inst: _tickInstance.current});

        if (!_tickRef.current) {
            return;
        }

        const elTick = document.createElement('div');
        elTick.className = "tick";

        const elFlex = document.createElement('div');
        elFlex.className = "flex";
        elFlex.dataset.repeat = 'true';
        elFlex.ariaHidden = 'true';

        const elSpan = document.createElement('span');
        elSpan.dataset.view = "flip";
        
        elFlex.appendChild(elSpan);
        elTick.appendChild(elFlex);
        _tickRef.current.appendChild(elTick);

        //

        
        _tickInstance.current = Tick.DOM.create(elTick, {
            value: value
        });

        return () => {
            elTick.parentElement?.removeChild(elTick);

            console.log('unmount', {ref: _tickRef.current, clos: elTick, inst: _tickInstance.current});
            Tick.DOM.destroy(elTick);
        };
    }, []);

    React.useEffect(() => {
        _tickInstance.current && (_tickInstance.current.value = value);
    }, [value]);

    /*
        <div className="">
            <div ref={_tickRef} className="tick">
                <div className="flex" data-repeat="true" aria-hidden="true">
                    <span data-view="flip">Tick</span>
                </div>
            </div>
        </div>
    */

    return (
        <div ref={_tickRef} className="">
        </div>
    );
}
