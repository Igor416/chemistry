export default function translateElement(target: HTMLElement, atomicNumber: number, elementWidth: number) {
  const original = document.getElementById(atomicNumber + '_element') as HTMLElement;
  const clone = original.cloneNode() as HTMLElement;
  const circles = document.getElementsByClassName('circle')

  //get coords
  const { left: x0, top: y0, width: width, height: height } = original.getBoundingClientRect();
  target.append(clone);
  const { left: x1, top: y1 } = clone.getBoundingClientRect();

  //set styles
  clone.style.height = clone.style.width = elementWidth + 'px'
  clone.style.borderRadius = '50%'

  //animate
  clone.animate([
    { transform: `translate(${x0 - x1}px, ${y0 - y1}px)`, borderRadius: '100%', height: height + 'px', width: width + 'px' },
    { transform: 'translate(0, 0)', borderRadius: '50%', height: elementWidth + 'px', width: elementWidth + 'px' },
  ], {
    duration: 400,
    easing: 'linear',
  });
  
  //populate with content
  setTimeout(() => {
    Array.of(...circles).forEach(circle => target.appendChild(circle.cloneNode(true)))
    clone.appendChild(document.getElementById('center')?.cloneNode(true) as Node)
    clone.appendChild(document.getElementById('nucleus')?.cloneNode(true) as Node)
  }, 400)
}