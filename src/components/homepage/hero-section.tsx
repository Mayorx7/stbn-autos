import Link from "next/link";
import { routes } from "@/config/routes";
import {
  ArrowRight,
  ChevronRight,
  Facebook,
  Instagram,
  Phone,
  Search,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BudgetSuggestion,
  NAIRA_BUDGET_SUGGESTIONS,
  buildInventoryUrl,
  describeBudgetText,
  formatNumberClusters,
  parseBudgetText,
} from "@/lib/budget";

const HeroSection = () => {
  const [budget, setBudget] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeSuggestionId, setActiveSuggestionId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const inputEl = event.target;
    const selectionStart = inputEl.selectionStart ?? rawValue.length;
    const nonCommasBefore = rawValue
      .slice(0, selectionStart)
      .replace(/,/g, "").length;

    const formatted = formatNumberClusters(rawValue);
    setBudget(formatted);
    setActiveSuggestionId(null);
    setShowDropdown(true);

    requestAnimationFrame(() => {
      if (!inputRef.current) return;
      let nonCommasCount = 0;
      let newCursorPos = formatted.length;
      for (let i = 0; i < formatted.length; i++) {
        if (formatted[i] !== ",") nonCommasCount++;
        if (nonCommasCount === nonCommasBefore) {
          newCursorPos = i + 1;
          break;
        }
      }
      inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
    });
  };

  const handleSelectSuggestion = (suggestion: BudgetSuggestion) => {
    setBudget(suggestion.label);
    setActiveSuggestionId(suggestion.id);
    setShowDropdown(false);
    navigate(buildInventoryUrl(undefined, suggestion));
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowDropdown(false);
    const activeSuggestion = NAIRA_BUDGET_SUGGESTIONS.find(
      (s) => s.id === activeSuggestionId
    );
    navigate(buildInventoryUrl(budget, activeSuggestion));
  };

  const handleClear = () => {
    setBudget("");
    setActiveSuggestionId(null);
    inputRef.current?.focus();
  };

  const trimmedBudget = budget.trim().toLowerCase();
  const filteredSuggestions = trimmedBudget
    ? NAIRA_BUDGET_SUGGESTIONS.filter(
        (s) =>
          s.label.toLowerCase().includes(trimmedBudget) ||
          s.shortLabel.toLowerCase().includes(trimmedBudget) ||
          s.description.toLowerCase().includes(trimmedBudget)
      )
    : NAIRA_BUDGET_SUGGESTIONS;

  const budgetClarifier = describeBudgetText(budget);
  const parsedPreview = trimmedBudget ? parseBudgetText(trimmedBudget) : null;

  return (
    <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-[#031B3D] text-white lg:min-h-[calc(100svh-5rem)]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/placeholder.jpg"
      >
        <source src="/hero-car.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-[#031B3D]/95 via-[#031B3D]/45 to-[#031B3D]/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#031B3D] via-transparent to-[#031B3D]/45" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-end gap-7 px-5 pb-24 pt-16 sm:pt-36 lg:min-h-[calc(100svh-5rem)] lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="max-w-xl">
          <h1 className="text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
            Drive what
            <br />
            moves you.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-[#D9ECFA] sm:mt-6 sm:text-base">
            Exceptional vehicles, transparently sourced and expertly prepared
            for every journey ahead.
          </p>
          <Link
            href={routes.inventory}
            className="mt-6 inline-flex items-center gap-3 rounded-md bg-[#FFC400] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#031B3D] transition hover:bg-[#FFD34D] sm:mt-8 sm:px-6"
          >
            Explore inventory <ArrowRight size={16} />
          </Link>
        </div>

        {/* Budget Form Card */}
        <div ref={containerRef} className="w-full max-w-sm sm:max-w-md lg:mr-4">
          <form
            onSubmit={handleSearch}
            className="relative rounded-xl border border-white/15 bg-[#031B3D]/85 p-4 sm:rounded-2xl sm:p-6 shadow-2xl backdrop-blur-lg"
          >
            {/* Header */}
            <div className="mb-3 border-b border-white/10 pb-3 sm:mb-4 sm:pb-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <label
                    htmlFor="hero-budget"
                    className="block text-base font-bold text-white leading-snug"
                  >
                    What is your budget?
                  </label>
                  <p className="mt-0.5 text-xs text-[#D9ECFA]">
                    Type an amount or pick a range below
                  </p>
                </div>
                <span className="shrink-0 rounded border border-[#FFC400]/40 bg-[#FFC400]/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#FFF0B3]">
                  NGN / ₦
                </span>
              </div>
            </div>

            {/* Text Input Row */}
            <div className="relative">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm font-bold text-[#53657A]">
                    ₦
                  </span>
                  <input
                    ref={inputRef}
                    id="hero-budget"
                    type="text"
                    value={budget}
                    onChange={handleInputChange}
                    onFocus={() => setShowDropdown(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setShowDropdown(false);
                    }}
                    placeholder="e.g. 5,000,000 or 7M - 10M"
                    autoComplete="off"
                    list="hero-budget-ranges"
                    className="w-full rounded-lg border border-white/15 bg-white/95 py-2.5 pl-8 pr-8 text-sm font-semibold text-[#062A5E] placeholder:font-normal placeholder:text-[#8B9AAF] outline-none transition focus:border-[#FFC400] focus:ring-2 focus:ring-[#FFC400]/25"
                  />
                  {budget && (
                    <button
                      type="button"
                      onClick={handleClear}
                      aria-label="Clear budget"
                      className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-[#8B9AAF] hover:text-[#062A5E] transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  className="shrink-0 rounded-lg bg-[#FFC400] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#031B3D] transition hover:bg-[#FFD34D] active:scale-95"
                >
                  Search
                </button>
              </div>

              {/* Live Clarifier — Confirms exact amount to prevent zero-counting errors */}
              {budgetClarifier && (
                <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#FFC400]/25 bg-[#0c2a4a]/80 px-3 py-2 text-xs">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="font-extrabold text-white">
                      {budgetClarifier.compact}
                    </span>
                    <span className="text-[#FFC400]">{budgetClarifier.inWords}</span>
                  </div>
                  {budgetClarifier.canQuickExpandMillion && budgetClarifier.expandedValue && (
                    <button
                      type="button"
                      onClick={() => {
                        setBudget(budgetClarifier.expandedValue!);
                        inputRef.current?.focus();
                      }}
                      className="rounded border border-[#FFC400]/40 bg-[#FFC400]/20 px-2 py-0.5 text-[11px] font-bold text-[#FFF0B3] hover:bg-[#FFC400] hover:text-[#031B3D]/40 transition-colors"
                    >
                      Use {budgetClarifier.expandedValue}
                    </button>
                  )}
                </div>
              )}

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-white/15 bg-[#031B3D]/95 shadow-2xl backdrop-blur-xl">
                  <div className="border-b border-white/10 px-3 py-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#53657A]">
                      Budget Ranges in Naira
                    </span>
                  </div>
                  <div className="max-h-60 overflow-y-auto p-1.5 space-y-0.5">
                    {filteredSuggestions.length > 0 ? (
                      filteredSuggestions.map((suggestion) => {
                        const isSelected = activeSuggestionId === suggestion.id;
                        return (
                          <button
                            key={suggestion.id}
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleSelectSuggestion(suggestion);
                            }}
                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition ${
                              isSelected
                                ? "bg-[#FFC400] text-[#031B3D]"
                                : "text-white/90 hover:bg-white/8"
                            }`}
                          >
                            <div>
                              <div className="text-sm font-semibold leading-tight">
                                {suggestion.label}
                              </div>
                              <div className="mt-0.5 text-[11px] text-[#D9ECFA]/80">
                                {suggestion.description}
                              </div>
                            </div>
                            <ChevronRight size={14} className="shrink-0 text-[#53657A]" />
                          </button>
                        );
                      })
                    ) : (
                      <div className="px-3 py-3 text-xs text-[#D9ECFA]">
                        Press Search to find cars for{" "}
                        <span className="font-semibold text-white">"{budget}"</span>
                      </div>
                    )}
                  </div>
                  {parsedPreview &&
                    (parsedPreview.minPrice !== undefined || parsedPreview.maxPrice !== undefined) && (
                      <div className="border-t border-white/10 px-3 py-2 text-[11px] text-[#D9ECFA]">
                        Will filter:{" "}
                        {parsedPreview.minPrice !== undefined &&
                          `Min ₦${parsedPreview.minPrice.toLocaleString()}`}
                        {parsedPreview.minPrice !== undefined &&
                          parsedPreview.maxPrice !== undefined &&
                          " — "}
                        {parsedPreview.maxPrice !== undefined &&
                          `Max ₦${parsedPreview.maxPrice.toLocaleString()}`}
                      </div>
                    )}
                </div>
              )}

              <datalist id="hero-budget-ranges">
                {NAIRA_BUDGET_SUGGESTIONS.map((s) => (
                  <option key={s.id} value={s.label}>
                    {s.description}
                  </option>
                ))}
              </datalist>
            </div>

            {/* Quick Range Chips */}
            <div className="mt-4 hidden border-t border-white/10 pt-4 sm:block">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#53657A]">
                Quick select a range
              </p>
              <div className="flex flex-wrap gap-1.5">
                {NAIRA_BUDGET_SUGGESTIONS.map((suggestion) => {
                  const isActive = activeSuggestionId === suggestion.id;
                  return (
                    <button
                      key={suggestion.id}
                      type="button"
                      onClick={() => handleSelectSuggestion(suggestion)}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                        isActive
                          ? "border-[#FFC400] bg-[#FFC400] text-[#031B3D]"
                          : "border-white/20 bg-white/8 text-[#D9ECFA] hover:border-white/40 hover:bg-white/15 hover:text-white"
                      }`}
                    >
                      {suggestion.shortLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 z-10 hidden w-full border-t border-white/20 bg-[#031B3D]/65 backdrop-blur-sm sm:block">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div className="grid grid-cols-3 gap-6 text-[10px] uppercase tracking-wider text-[#D9ECFA] sm:gap-10">
            <div><span className="block text-lg text-white">100%</span>Inspected</div>
            <div><span className="block text-lg text-white">24/7</span>Support</div>
            <div><span className="block text-lg text-white">NG</span>Nationwide</div>
          </div>
          <div className="flex items-center gap-4 text-[#D9ECFA]">
            <a href="tel:08161163069" aria-label="Call STBN Autos" className="hover:text-white">
              <Phone size={16} />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-white">
              <Instagram size={16} />
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-white">
              <Facebook size={16} />
            </a>
            <Link href={routes.inventory} aria-label="Search inventory" className="hover:text-white">
              <Search size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
