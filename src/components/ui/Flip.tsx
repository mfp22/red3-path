import React from "react";
import Tick from "@pqina/flip";
import "@pqina/flip/dist/flip.min.css";

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
        _tickInstance.current = Tick.DOM.create(_tickRef.current, {
            value: value
        });

        const closure = _tickRef.current;

        return () => {
            console.log('unmount', {ref: _tickRef.current, clos: closure, inst: _tickInstance.current});
            Tick.DOM.destroy(closure);
        };
    }, []);

    React.useEffect(() => {
        _tickInstance.current && (_tickInstance.current.value = value);
    }, [value]);

    return (
        <div className="">
            <div ref={_tickRef} className="tick">
                <div className="flex" data-repeat="true" aria-hidden="true">
                    <span data-view="flip">Tick</span>
                </div>
            </div>
            111
        </div>
    );
}
