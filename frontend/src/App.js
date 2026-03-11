import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { useStore } from './store';

function App() {
  const pipelineName = useStore((s) => s.pipelineName);
  const setPipelineName = useStore((s) => s.setPipelineName);

  return (
    <div className="vs-app">
      <aside className="vs-sidebar">
        <div className="vs-brand">
          <div className="vs-brandMark">VS</div>
          <div className="vs-brandText">
            <div className="vs-brandName">VectorShift</div>
            <div className="vs-brandSub">Pipeline Builder</div>
          </div>
        </div>
        <div className="vs-pipelineNameBlock">
          <label className="vs-field">
            <span className="vs-fieldLabel">Pipeline name</span>
            <input
              className="vs-input vs-pipelineNameInput"
              type="text"
              value={pipelineName}
              onChange={(e) => setPipelineName(e.target.value)}
              placeholder="Untitled pipeline"
            />
          </label>
        </div>
        <PipelineToolbar />
        <div className="vs-sidebarFooter">
          <SubmitButton />
          <div className="vs-muted">
            Tip: Use the Text node with <code>{"{{input}}"}</code>.
          </div>
        </div>
      </aside>

      <main className="vs-main">
        <PipelineUI />
      </main>
    </div>
  );
}

export default App;
