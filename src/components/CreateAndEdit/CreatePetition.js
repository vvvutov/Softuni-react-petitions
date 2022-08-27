import './create.css'

export const CreatePetition = () => {
    return (
        <>

            <section id="create-container">
                <div className="create-container-info">
                    <h1>Създай петиция</h1>
                    <form  >
                        <label for="title" >Заглавие <strong>  *</strong></label>
                        <input type="text" id="title" name="title" placeholder="Заглавие на вашата петиция" />
                        <label for="imageURL">Поставете URL към изображение</label>
                        <input type="text" id="imageURL" name="" placeholder="http://..." />
                        <label for="description">Кратко описание <strong>  *</strong></label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Кратко описание"
                            rows="3"
                        />
                        <label for="petition-text">Вашия текст <strong>  *</strong></label>
                        <textarea
                            id="petition-text"
                            name="petitionText"
                            placeholder="Вашия текст"
                            rows="10"
                        />
                        <label for="category">Категория:</label>
                        <select id="category" name="category">
                            <option value="none" selected disabled hidden>Изберете категория</option>

                            <option value="ecology">Екология</option>
                            <option value="social">Социална тематика</option>
                            <option value="politics">Политика</option>
                            <option value="charity">Благотворителност</option>
                            <option value="other">Друго...</option>
                        </select>

                        <label for="other" >Дайте кратко описание<strong>  *</strong></label>
                        <input type="text" id="other" name="other" placeholder="Категория" />

                        <label for="goal" >Колко подписа целите да съберете? <strong>  *</strong></label>
                        <input type="number" id="goal" name="goal" placeholder="Колко подписа целите да съберете?" />

                        <div style={{ "display": "grid" }}>

                            <li >
                                <label for="showMyName" >Покажи името ми
                                    <input type="checkbox"
                                        id="showMyName"
                                        name="showMyName"
                                    // checked={values.confirmation.checked}
                                    // onChange={checkboxHandler}
                                    />
                                </label>
                            </li>
                            <li >

                                <label for="showMyLastname" >Покажи фамилията ми
                                    <input type="checkbox"
                                        id="showMyLastname"
                                        name="showMyLastname"
                                    // checked={values.confirmation.checked}
                                    // onChange={checkboxHandler}
                                    />
                                </label>
                            </li>
                            <li >

                                <label for="showMyAge" >Покажи възрастта ми
                                    <input type="checkbox"
                                        id="showMyAge"
                                        name="showMyAge"
                                    // checked={values.confirmation.checked}
                                    // onChange={checkboxHandler}
                                    />
                                </label>
                            </li>
                            <li >

                                <label for="showMyAge" >Покажи пола ми
                                    <input type="checkbox"
                                        id="showMyAge"
                                        name="showMyAge"
                                    // checked={values.confirmation.checked}
                                    // onChange={checkboxHandler}
                                    />
                                </label>

                            </li>
                        </div>

                        <input type="submit" id="btn" value="submit" />
                    </form>
                </div>
            </section>
        </>
    )
};