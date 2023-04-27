import './progressBar.css'

export const ProgressBar = ({ petition }) => {


    return (
        <div className="progress-bar">
            <span style={{
                width: `${(petition.signed / petition.goal) * 100}%`,
            }}>
            </span>
            <div className="progress-bar-text">
                <span>{petition.signed} от {petition.goal} събрани подписа</span>
            </div>
        </div>
    );
};