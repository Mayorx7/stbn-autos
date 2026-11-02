const font = (name: string) => (options: { variable?: string }) => ({ className: name, variable: options.variable ?? "" });
export const Geist = font("geist");
export const Geist_Mono = font("geist-mono");
export const Mulish = font("mulish");
export const Roboto = font("roboto");
