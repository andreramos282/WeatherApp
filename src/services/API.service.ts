import getRequest from "../connections/getRequest"

const API_KEY = import.meta.env.VITE_API_KEY

class APIService {
    public async convertCityToLatLon(city: string) {
        const url = "http://api.openweathermap.org/geo/1.0/direct"
        const query = {
            q: city,
            appid: API_KEY
        }

        const res = await getRequest<any>(url, query)

        return { lat: res[0].lat, lon: res[0].lon }
    }

    public async getWeatherPerCity(city: string) {
        try {
            const { lat, lon } = await this.convertCityToLatLon(city)
            const url = "https://api.openweathermap.org/data/2.5/weather"
            const query = {
                lat,
                lon,
                units: "metric",
                lang: "pt_br",
                appid: API_KEY
            }

            const res = await getRequest<any>(url, query)

            return {
                clouds: res.weather[0].description,
                humidity: res.main.humidity,
                temp: res.main.temp,
                icon: `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`,
                error: false
            }
        } catch {
            return {
                clouds: "",
                humidity: "",
                temp: "",
                icon: "",
                error: true
            }
        }
    }
}

export const apiService = new APIService()