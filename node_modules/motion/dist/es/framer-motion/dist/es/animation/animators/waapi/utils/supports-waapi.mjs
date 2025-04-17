import { memo } from '../../../../../../../motion-utils/dist/es/memo.mjs';

const supportsWaapi = /*@__PURE__*/ memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));

export { supportsWaapi };
