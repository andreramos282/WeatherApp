import { useState } from "react"
import { apiService } from "../services/API.service"
import css from "../styles/home.module.css"

function HomePage() {
    const [image, setImage] = useState("")
    const [cloud, setCloud] = useState("")
    const [humidity, setHumidity] = useState("")
    const [temp, setTemp] = useState("")
    const [city, setCity] = useState("")
    const [error, setError] = useState<boolean>(false)

    async function getWeather() {
        const res = await apiService.getWeatherPerCity(city)
        if (res.error) {
            setCloud("")
            setError(true)
            return
        }
        setImage(res.icon)
        setCloud(res.clouds)
        setHumidity(res.humidity)
        setTemp(res.temp)
        setError(false)
    }

    return (
        <main className={css.main}>
            <div className={css.input_container}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Cidade"
                />
                <button onClick={getWeather}>Verificar</button>
            </div>
            {cloud && !error ?
                <div className={css.weather_container}>
                    <div className={css.images}>
                        <img src={image} alt="" />
                        <h2>{cloud}</h2>
                    </div>
                    <div className={css.info}>
                        <h3 className={css.temp}>Temperatura: {temp}</h3>
                        <h3 className={css.humi}>Umidade: {humidity}</h3>
                    </div>
                </div>
                :
                <div className={css.error}>
                    Erro ao carregar a cidade, insira o nome corretamente.
                </div>
            }
        </main>
    )
}

export default HomePage