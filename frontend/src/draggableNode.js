// draggableNode.js
import { useStore } from "./store";

export const DraggableNode = ({ type, label }) => {
    const addNode = useStore((s) => s.addNode);
    const getNodeID = useStore((s) => s.getNodeID);
    const nodes = useStore((s) => s.nodes);

    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const onClickAdd = () => {
      const id = getNodeID(type);
      const index = nodes.length;
      const baseX = 320;
      const baseY = 120;
      const offsetX = 260;
      const offsetY = 180;
      const col = index % 3;
      const row = Math.floor(index / 3);
      const position = { x: baseX + col * offsetX, y: baseY + row * offsetY };
      addNode({
        id,
        type,
        position,
        data: { id, nodeType: type },
      });
    };
  
    return (
      <div
        className={`vs-paletteItem vs-paletteItem-${type}`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        onClick={onClickAdd}
        draggable
      >
          <span className="vs-paletteItemLabel">{label}</span>
      </div>
    );
  };
  