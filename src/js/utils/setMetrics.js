export function setMetrics(nodeElements, metrick) {
  nodeElements.forEach((element) => {
    element.addEventListener("click", metrick);
  });
}
