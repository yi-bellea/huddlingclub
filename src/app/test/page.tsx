import Button from "@/components/Button";

const sizes = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
] as const;

const states = [
  { value: "default", label: "기본" },
  { value: "hover", label: "Hover 미리보기" },
  { value: "disabled", label: "비활성화" },
] as const;

export default function ButtonTestPage() {
  return (
    <main className="min-h-screen bg-background-default px-page-horizontal py-section text-text-primary">
      <div className="flex flex-col gap-stack-lg">
        <header className="flex flex-col gap-stack-sm">
          <h1 className="typography-heading-lg">Button 실습</h1>
          <p className="typography-body-md text-text-secondary">
            크기와 상태별 버튼을 한눈에 확인할 수 있습니다.
          </p>
        </header>

        {sizes.map((size) => (
          <section
            key={size.value}
            aria-labelledby={`button-size-${size.value}`}
            className="flex flex-col gap-stack-md rounded-card border border-border-default bg-surface-default p-stack-md"
          >
            <h2
              id={`button-size-${size.value}`}
              className="typography-label-lg"
            >
              {size.label}
            </h2>
            <div className="flex flex-wrap gap-stack-lg">
              {states.map((state) => (
                <div
                  key={state.value}
                  className="flex flex-col items-start gap-stack-sm"
                >
                  <span className="typography-caption-md text-text-secondary">
                    {state.label}
                  </span>
                  <Button size={size.value} previewState={state.value}>
                    Button
                  </Button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
