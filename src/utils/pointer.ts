export function pointer(event: React.PointerEvent<Element> | PointerEvent, node?: HTMLElement | SVGElement | null): [number, number] {
    if (node === undefined) node = event.currentTarget as any;
    if (node) {
        var svg = ((node as any).ownerSVGElement || node) as SVGSVGElement;
        if (svg.createSVGPoint) {
            var point = svg.createSVGPoint();
            point.x = event.clientX, point.y = event.clientY;
            point = point.matrixTransform((node as SVGGraphicsElement).getScreenCTM()?.inverse());
            return [point.x, point.y];
        }
        if (node.getBoundingClientRect) {
            var rect = node.getBoundingClientRect();
            return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
        }
    }
    return [event.pageX, event.pageY];
}
