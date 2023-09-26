import { createSignal } from "solid-js";

const [width, setWidth] = createSignal(window.innerWidth);

const mobile = () => width() <= 480;
const tablet = () => width() > 480 && width() <= 768;
const desktop = () => width() > 748;

export { mobile, tablet, desktop, setWidth };
