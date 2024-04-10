import { useNavigate } from "@remix-run/react";

export default function UiTitleBar(param) {
    const navigate = useNavigate();
    return (
        <ui-title-bar title={param.title}>
            <button onClick={() => navigate("/app/indextable")}>
                Index Table
            </button>
            <button onClick={() => navigate("/app/resourcelist")}>
                Resource List
            </button>
        </ui-title-bar>
    )
}