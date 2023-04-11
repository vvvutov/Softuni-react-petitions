import './progressBar.css'

export const ProgressBar = ({petition}) => {
    return (
        <p className="progress-bar">
            <span style={{
                width: `${(petition.signed / petition.goal) * 100}%`,
                // height: '10px',
                // backgroundColor: '#4568dc',
                // borderRadius: '5px',
                // transition: 'width 0.5s ease-in-out',
            }}></span>
        </p>
    )
}