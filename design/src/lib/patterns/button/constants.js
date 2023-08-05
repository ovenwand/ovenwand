export const SIZE = Object.freeze({
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl",
  XXL: "2xl",
});

/**
 * @typedef {typeof SIZE[keyof typeof SIZE]} Size
 */

export const VARIANT = Object.freeze({
  PRIMARY: "primary",
  SECONDARY: "secondary",
  GHOST: "ghost",
  DANGER: "danger",
});

/**
 * @typedef {typeof VARIANT[keyof typeof VARIANT]} Variant
 */

export const STATUS = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
  DISABLED: "disabled",
});

/**
 * @typedef {typeof STATUS[keyof typeof STATUS]} Status
 */

export const STATUS_ICON = Object.freeze({
  [STATUS.ERROR]: "error--filled",
  [STATUS.SUCCESS]: "checkmark--filled",
});
