import GeometryRender from "./geometryRender";
import GraphRender from "./graphRender";
import StatisticsRender from "./statisticsRender";

// Ritar den figur, graf eller det diagram som hör till en fråga (om något).
function QuestionFigure({ question }) {
    return (
        <>
            {question.graph && (
                <div className="geometry-container">
                    <GraphRender graph={question.graph} />
                </div>
            )}

            {question.geometry && (
                <div className="geometry-container">
                    <GeometryRender geometry={question.geometry} />
                </div>
            )}

            {question.statistics && (
                <div className="statistics-container">
                    <StatisticsRender statistics={question.statistics} />
                </div>
            )}
        </>
    );
}

export default QuestionFigure;
