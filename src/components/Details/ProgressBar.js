import './progressBar.css'

export const ProgressBar = ({petition}) => {
    return (
        <p className="progress-bar">
            <span style={{
                width: `${(petition.signed / petition.goal) * 100}%`,
            }}></span>
        </p>
    )
}