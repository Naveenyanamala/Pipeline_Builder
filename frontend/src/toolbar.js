// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="vs-toolbar">
            <div className="vs-toolbarTitle">Pipeline Nodes</div>
            <div className="vs-toolbarGrid">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />

                <div className="vs-toolbarDivider" />

                <DraggableNode type='merge' label='Merge' />
                <DraggableNode type='condition' label='Condition' />
                <DraggableNode type='delay' label='Delay' />
                <DraggableNode type='httpRequest' label='HTTP' />
                <DraggableNode type='jsonParse' label='JSON' />
            </div>
        </div>
    );
};
