import { cn } from "@/lib/utils";
import React, { forwardRef, useRef } from "react";

interface PinCodeProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "value"
  > {
  setValue: React.Dispatch<React.SetStateAction<string | number | undefined>>;
  type?: "text" | "number";
  length?: number;
  center?: boolean;
  inputClassName?: string;
}

const containerClassNames = {
  base: "flex flex-row",
  center: "justify-center align-center",
};

const inputClassNames = {
  base: "block peer text-center text-[#062A5E] bg-transparent mr-2 focus:placeholder:opacity-0 focus:outline-hidden transition duration-200 disabled:bg-[#F3F6FA] disabled:placeholder:text-[#53657A] disabled:text-[#53657A] disabled:cursor-not-allowed disabled:border-[#D7DEE8] rounded focus:outline-hidden focus:border-[#0757A6]",
  size: "p-2 text-2xl font-medium w-12 h-12 sm:h-[70px] sm: w-[70px]",
  color: {
    base: "bg-transparent focus:ring-[0.6px] border border-[#D7DEE8] focus-visible:border-[#0757A6] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#0757A6] placeholder:text-[#53657A]",
    active: "not-read-only:hover:enabled:border-[#0757A6] focus:ring-[#0757A6]",
  },
};

const OTPInput = forwardRef<HTMLInputElement, PinCodeProps>(
  (
    props,

    ref
  ) => {
    const {
      type = "text",
      defaultValue,
      length = 6,
      setValue,
      center = true,
      className,
      inputClassName,
      ...rest
    } = props;
    const inputRefs = useRef<HTMLInputElement[]>([]);

    function addInputRefs(index: number) {
      return (refs: HTMLInputElement) => {
        if (refs) inputRefs.current[index] = refs;
      };
    }
    function handleChange(
      event: React.ChangeEvent<HTMLInputElement>,
      index: number
    ) {
      const inputValues = event.target.value.split("");
      inputRefs.current[index].value =
        inputValues[inputValues.length - 1] || "";
      if (index < length - 1) inputRefs?.current[index + 1].focus();
      setPinvalue();
    }
    function handlePaste(
      event: React.ClipboardEvent<HTMLInputElement>,
      index: number
    ) {
      const copiedValues = event.clipboardData.getData("text").trim().split("");
      const isComplete = copiedValues.length >= length;
      for (let i = 0; i < length - index; i++) {
        inputRefs.current[i + index].value = copiedValues[i] || "";
        if (i + index === length - 1) {
          inputRefs.current[i + index].focus();
        } else {
          inputRefs.current[i + index + 1].focus();
        }
      }

      event.preventDefault();
      setPinvalue();
      if (isComplete) {
        const form = event.currentTarget.closest("form");
        form?.requestSubmit();
      }
    }
    function handleKeyDown(
      event: React.KeyboardEvent<HTMLInputElement>,
      index: number
    ) {
      const currentValue = inputRefs.current[index].value;
      if (event.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1].focus();
      }
      if (event.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1].focus();
      }

      if (event.key === "Backspace") {
        if (currentValue !== "") {
          inputRefs.current[index].value = "";
        } else {
          if (index === 0) {
            return;
          }
          inputRefs.current[index - 1].value = "";
          inputRefs.current[index - 1].focus();
          setPinvalue();
        }
      }
    }
    function setPinvalue() {
      setValue(inputRefs.current.map((node) => node.value).join(""));
    }
    return (
      <div className="flex flex-col" ref={ref}>
        <div
          className={cn(
            className,
            center && containerClassNames.center,
            containerClassNames.base
          )}
        >
          {Array.from({ length })
            .map((_, index) => index)
            .map((index) => {
              return (
                <input
                  type="text"
                  key={`otp-input-${index}`}
                  ref={addInputRefs(index)}
                  inputMode={type === "text" ? type : "numeric"}
                  autoCorrect="off"
                  autoComplete="off"
                  onChange={(e) => handleChange(e, index)}
                  onPaste={(e) => handlePaste(e, index)}
                  className={cn(
                    inputClassNames.base,
                    inputClassNames.size,
                    inputClassNames.color.active,
                    inputClassNames.color.base,
                    inputClassName,
                    "[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  )}
                />
              );
            })}
        </div>
      </div>
    );
  }
);

export default OTPInput;
