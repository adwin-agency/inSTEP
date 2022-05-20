export default function determineScrollWidth() {
  // создадим элемент с прокруткой
  const div = document.createElement("div");

  div.style.overflowY = "scroll";
  div.style.width = "50px";
  div.style.height = "50px";

  // мы должны вставить элемент в документ, иначе размеры будут равны 0
  document.body.append(div);
  const scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;

  // return window.innerWidth - document.documentElement.clientWidth;
}
