import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const BoardEditor = ()=>{
    const [editorState, setEditorState] = useState()
    return(
        <div id="BoardEditor">
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
            />;
        </div>
    )
}

export default BoardEditor;