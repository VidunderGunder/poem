import { createSignal, type Component, type JSX } from "solid-js";

/**
 * Hack to get syntax highlighting for css template literal
 */
function css(strings: TemplateStringsArray, ...values: any[]) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (values[i] || "");
  });
  return str;
}

const [text, setText] = createSignal("");
const handleInput: JSX.EventHandlerUnion<HTMLElement, InputEvent> = (e) => {
  const target = e.currentTarget;
  const value = target.textContent;
  setText(value ?? "");
};

const App: Component = () => {
  return (
    <div
      style={css`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
      `}
      onClick={(e) => {
        e.preventDefault();
        // @ts-ignore
        e.currentTarget.querySelector("div.textarea")?.focus();
      }}
    >
      <div
        style={css`
          position: relative;
          font-family: monospace;
          font-size: 1rem;
          width: 350px;
        `}
      >
        <div
          class="textarea"
          contentEditable
          role="textbox"
          style={css`
            min-height: 1em;
            max-width: 100%;
            outline: none;
          `}
          onInput={handleInput}
        />
        <div
          class="placeholder"
          style={css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            opacity: 0.5;
            font-style: italic;
          `}
        >
          {text() === "" ? "Roses are red..." : null}
        </div>
      </div>
    </div>
  );
};

export default App;
