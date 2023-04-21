import './notFound.css'

export const NotFound = () => {
     return(
        <section id="not-found-page">
        <div className="not-found-page-container">
            <h2>404</h2>
            <p>Страницата не съществува<a href="/"
                    className="btn">Петиции</a>.
            </p>
        </div>
    </section>
     )
};