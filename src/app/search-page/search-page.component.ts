import { Component, inject } from '@angular/core';
import { FormControl, FormGroup,  ReactiveFormsModule  } from '@angular/forms';
import { WeatherApiHandler } from '../_handlers/weather-api-handler';
import { FavoriteHandler } from '../_handlers/favorite-handler'
import { RouterOutlet } from '@angular/router';

const testData = [{"Version":1,"Key":"51097","Type":"City","Rank":20,"LocalizedName":"Sofia","Country":{"ID":"BG","LocalizedName":"Bulgaria"},"AdministrativeArea":{"ID":"22","LocalizedName":"Sofia City"}},{"Version":1,"Key":"122222","Type":"City","Rank":75,"LocalizedName":"Sofia","Country":{"ID":"CU","LocalizedName":"Cuba"},"AdministrativeArea":{"ID":"08","LocalizedName":"Ciego de Ávila"}},{"Version":1,"Key":"122024","Type":"City","Rank":75,"LocalizedName":"Sofia","Country":{"ID":"CU","LocalizedName":"Cuba"},"AdministrativeArea":{"ID":"09","LocalizedName":"Camagüey"}},{"Version":1,"Key":"2287626","Type":"City","Rank":85,"LocalizedName":"Sofia","Country":{"ID":"GR","LocalizedName":"Greece"},"AdministrativeArea":{"ID":"F","LocalizedName":"Ionian Islands"}},{"Version":1,"Key":"242701","Type":"City","Rank":85,"LocalizedName":"Sofia","Country":{"ID":"MD","LocalizedName":"Moldova"},"AdministrativeArea":{"ID":"DR","LocalizedName":"Drochia"}},{"Version":1,"Key":"243611","Type":"City","Rank":85,"LocalizedName":"Sofia","Country":{"ID":"MD","LocalizedName":"Moldova"},"AdministrativeArea":{"ID":"HI","LocalizedName":"Hîncești"}},{"Version":1,"Key":"1269643","Type":"City","Rank":105,"LocalizedName":"Sofiada","Country":{"ID":"GR","LocalizedName":"Greece"},"AdministrativeArea":{"ID":"H","LocalizedName":"Central Greece"}},{"Version":1,"Key":"1269642","Type":"City","Rank":105,"LocalizedName":"Sofiana","Country":{"ID":"GR","LocalizedName":"Greece"},"AdministrativeArea":{"ID":"J","LocalizedName":"Peloponnese"}}]
const testDataCurWeather = [{"LocalObservationDateTime":"2024-07-24T18:06:00+03:00","EpochTime":1721833560,"WeatherText":"Cloudy"
  ,"WeatherIcon":7,"HasPrecipitation":false,"PrecipitationType":null,"IsDayTime":true,
  "Temperature":{"Metric":{"Value":27.2,"Unit":"C","UnitType":17},
  "Imperial":{"Value":81,"Unit":"F","UnitType":18}},
  "MobileLink":"http://www.accuweather.com/en/bg/sofia/51097/current-weather/51097?lang=en-us","Link":"http://www.accuweather.com/en/bg/sofia/51097/current-weather/51097?lang=en-us"}]
const testData5dayWeather = {"Key": "51097", "Headline":{"EffectiveDate":"2024-07-25T02:00:00+03:00","EffectiveEpochDate":1721862000,"Severity":5,"Text":"Expect showers late Wednesday night","Category":"rain","EndDate":"2024-07-25T08:00:00+03:00","EndEpochDate":1721883600,"MobileLink":"http://www.accuweather.com/en/bg/sofia/51097/daily-weather-forecast/51097?lang=en-us","Link":"http://www.accuweather.com/en/bg/sofia/51097/daily-weather-forecast/51097?lang=en-us"},
"DailyForecasts":[
{"Date":"2024-07-24T07:00:00+03:00","EpochDate":1721793600,"Temperature":{"Minimum":{"Value":61,"Unit":"F","UnitType":18},"Maximum":{"Value":84,"Unit":"F","UnitType":18}},"Day":{"Icon":16,"IconPhrase":"Mostly cloudy w/ t-storms","HasPrecipitation":true,"PrecipitationType":"Rain","PrecipitationIntensity":"Light"},"Night":{"Icon":12,"IconPhrase":"Showers","HasPrecipitation":true,"PrecipitationType":"Rain","PrecipitationIntensity":"Moderate"},"Sources":["AccuWeather"],"MobileLink":"http://www.accuweather.com/en/bg/sofia/51097/daily-weather-forecast/51097?day=1&lang=en-us","Link":"http://www.accuweather.com/en/bg/sofia/51097/daily-weather-forecast/51097?day=1&lang=en-us"},
{"Date":"2024-07-25T07:00:00+03:00","EpochDate":1721880000,"Temperature":{"Minimum":{"Value":57,"Unit":"F","UnitType":18},"Maximum":{"Value":80,"Unit":"F","UnitType":18}},"Day":{"Icon":2,"IconPhrase":"Mostly sunny","HasPrecipitation":false},"Night":{"Icon":33,"IconPhrase":"Clear","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://www.accuweather.com/en/bg/sofia/51097/daily-weather-forecast/51097?day=2&lang=en-us","Link":"http://www.accuweather.com/en/bg/sofia/51097/daily-weather-forecast/51097?day=2&lang=en-us"},
{"Date":"2024-07-26T07:00:00+03:00","EpochDate":1721966400,"Temperature":{"Minimum":{"Value":55,"Unit":"F","UnitType":18},"Maximum":{"Value":82,"Unit":"F","UnitType":18}},"Day":{"Icon":2,"IconPhrase":"Mostly sunny","HasPrecipitation":false},"Night":{"Icon":33,"IconPhrase":"Clear","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://www.accuweather.com/en/bg/sofia/51097/daily-weather-forecast/51097?day=3&lang=en-us","Link":"http://www.accuweather.com/en/bg/sofia/51097/daily-weather-forecast/51097?day=3&lang=en-us"},
{"Date":"2024-07-27T07:00:00+03:00","EpochDate":1722052800,"Temperature":{"Minimum":{"Value":58,"Unit":"F","UnitType":18},"Maximum":{"Value":86,"Unit":"F","UnitType":18}},"Day":{"Icon":1,"IconPhrase":"Sunny","HasPrecipitation":false},"Night":{"Icon":33,"IconPhrase":"Clear","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://www.accuweather.com/en/bg/sofia/51097/daily-weather-forecast/51097?day=4&lang=en-us","Link":"http://www.accuweather.com/en/bg/sofia/51097/daily-weather-forecast/51097?day=4&lang=en-us"},
{"Date":"2024-07-28T07:00:00+03:00","EpochDate":1722139200,"Temperature":{"Minimum":{"Value":59,"Unit":"F","UnitType":18},"Maximum":{"Value":91,"Unit":"F","UnitType":18}},"Day":{"Icon":1,"IconPhrase":"Sunny","HasPrecipitation":false},"Night":{"Icon":33,"IconPhrase":"Clear","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://www.accuweather.com/en/bg/sofia/51097/daily-weather-forecast/51097?day=5&lang=en-us","Link":"http://www.accuweather.com/en/bg/sofia/51097/daily-weather-forecast/51097?day=5&lang=en-us"}]}

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [RouterOutlet,  ReactiveFormsModule ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  cities: any[] = [
      {"Version":1,"Key":"51097","Type":"City","Rank":20,"LocalizedName":"Sofia","Country":{"ID":"BG","LocalizedName":"Bulgaria"},"AdministrativeArea":{"ID":"22","LocalizedName":"Sofia City"}},
      {"Version":1,"Key":"122222","Type":"City","Rank":75,"LocalizedName":"Sofia","Country":{"ID":"CU","LocalizedName":"Cuba"},"AdministrativeArea":{"ID":"08","LocalizedName":"Ciego de Ávila"}},
      {"Version":1,"Key":"2287626","Type":"City","Rank":85,"LocalizedName":"Sofia","Country":{"ID":"GR","LocalizedName":"Greece"},"AdministrativeArea":{"ID":"F","LocalizedName":"Ionian Islands"}},
      {"Version":1,"Key":"243611","Type":"City","Rank":85,"LocalizedName":"Sofia","Country":{"ID":"MD","LocalizedName":"Moldova"},"AdministrativeArea":{"ID":"HI","LocalizedName":"Hîncești"}},
     {"Version":1,"Key":"1269642","Type":"City","Rank":105,"LocalizedName":"Sofiana","Country":{"ID":"GR","LocalizedName":"Greece"},"AdministrativeArea":{"ID":"J","LocalizedName":"Peloponnese"}}
    ];
  currentWeather: any = {"51097":{"LocalObservationDateTime":"2024-07-25T19:12:00+03:00","EpochTime":1721923920,"WeatherText":"Sunny","WeatherIcon":1,"HasPrecipitation":false,"PrecipitationType":null,"IsDayTime":true,"Temperature":{"Metric":{"Value":26.1,"Unit":"C","UnitType":17},"Imperial":{"Value":79,"Unit":"F","UnitType":18}},"MobileLink":"http://www.accuweather.com/en/bg/sofia/51097/current-weather/51097?lang=en-us","Link":"http://www.accuweather.com/en/bg/sofia/51097/current-weather/51097?lang=en-us"},"122024":{"LocalObservationDateTime":"2024-07-25T12:10:00-04:00","EpochTime":1721923800,"WeatherText":"Partly sunny","WeatherIcon":3,"HasPrecipitation":false,"PrecipitationType":null,"IsDayTime":true,"Temperature":{"Metric":{"Value":32.8,"Unit":"C","UnitType":17},"Imperial":{"Value":91,"Unit":"F","UnitType":18}},"MobileLink":"http://www.accuweather.com/en/cu/sofia/122024/current-weather/122024?lang=en-us","Link":"http://www.accuweather.com/en/cu/sofia/122024/current-weather/122024?lang=en-us"},"122222":{"LocalObservationDateTime":"2024-07-25T12:10:00-04:00","EpochTime":1721923800,"WeatherText":"Sunny","WeatherIcon":1,"HasPrecipitation":false,"PrecipitationType":null,"IsDayTime":true,"Temperature":{"Metric":{"Value":32.4,"Unit":"C","UnitType":17},"Imperial":{"Value":90,"Unit":"F","UnitType":18}},"MobileLink":"http://www.accuweather.com/en/cu/sofia/122222/current-weather/122222?lang=en-us","Link":"http://www.accuweather.com/en/cu/sofia/122222/current-weather/122222?lang=en-us"},"242701":{"LocalObservationDateTime":"2024-07-25T19:17:00+03:00","EpochTime":1721924220,"WeatherText":"Mostly sunny","WeatherIcon":2,"HasPrecipitation":false,"PrecipitationType":null,"IsDayTime":true,"Temperature":{"Metric":{"Value":23.3,"Unit":"C","UnitType":17},"Imperial":{"Value":74,"Unit":"F","UnitType":18}},"MobileLink":"http://www.accuweather.com/en/md/sofia/242701/current-weather/242701?lang=en-us","Link":"http://www.accuweather.com/en/md/sofia/242701/current-weather/242701?lang=en-us"},"243611":{"LocalObservationDateTime":"2024-07-25T19:21:00+03:00","EpochTime":1721924460,"WeatherText":"Cloudy","WeatherIcon":7,"HasPrecipitation":false,"PrecipitationType":null,"IsDayTime":true,"Temperature":{"Metric":{"Value":19,"Unit":"C","UnitType":17},"Imperial":{"Value":66,"Unit":"F","UnitType":18}},"MobileLink":"http://www.accuweather.com/en/md/sofia/243611/current-weather/243611?lang=en-us","Link":"http://www.accuweather.com/en/md/sofia/243611/current-weather/243611?lang=en-us"},"1269642":{"LocalObservationDateTime":"2024-07-25T19:17:00+03:00","EpochTime":1721924220,"WeatherText":"Partly sunny","WeatherIcon":3,"HasPrecipitation":false,"PrecipitationType":null,"IsDayTime":true,"Temperature":{"Metric":{"Value":22.3,"Unit":"C","UnitType":17},"Imperial":{"Value":72,"Unit":"F","UnitType":18}},"MobileLink":"http://www.accuweather.com/en/gr/sofiana/1269642/current-weather/1269642?lang=en-us","Link":"http://www.accuweather.com/en/gr/sofiana/1269642/current-weather/1269642?lang=en-us"},"1269643":{"LocalObservationDateTime":"2024-07-25T19:21:00+03:00","EpochTime":1721924460,"WeatherText":"Sunny","WeatherIcon":1,"HasPrecipitation":false,"PrecipitationType":null,"IsDayTime":true,"Temperature":{"Metric":{"Value":29.8,"Unit":"C","UnitType":17},"Imperial":{"Value":86,"Unit":"F","UnitType":18}},"MobileLink":"http://www.accuweather.com/en/gr/sofiada/1269643/current-weather/1269643?lang=en-us","Link":"http://www.accuweather.com/en/gr/sofiada/1269643/current-weather/1269643?lang=en-us"},"2287626":{"LocalObservationDateTime":"2024-07-25T19:21:00+03:00","EpochTime":1721924460,"WeatherText":"Sunny","WeatherIcon":1,"HasPrecipitation":false,"PrecipitationType":null,"IsDayTime":true,"Temperature":{"Metric":{"Value":31.1,"Unit":"C","UnitType":17},"Imperial":{"Value":88,"Unit":"F","UnitType":18}},"MobileLink":"http://www.accuweather.com/en/gr/sofia/2287626/current-weather/2287626?lang=en-us","Link":"http://www.accuweather.com/en/gr/sofia/2287626/current-weather/2287626?lang=en-us"}};
  cityForm = new FormGroup ({
    city: new FormControl('')
  })
  selectedCity: any = {"Version":1,"Key":"51097","Type":"City","Rank":20,"LocalizedName":"Sofia","Country":{"ID":"BG","LocalizedName":"Bulgaria"},"AdministrativeArea":{"ID":"22","LocalizedName":"Sofia City"}};
  forecast: any = testData5dayWeather;
  temperatureUnit = "C" 


//   cities: any[] = [{"Version":1,"Key":"51097","Type":"City","Rank":20,"LocalizedName":"Sofia","Country":{"ID":"BG","LocalizedName":"Bulgaria"},"AdministrativeArea":{"ID":"22","LocalizedName":"Sofia City"}},
//   ];
//   currentWeather: any = {};
//   selectedCity: any = {};
//   forecast: any = {};
//   temperatureUnit = "C" 
//   cityForm = new FormGroup ({
//   city: new FormControl('')
// })

  WeatherApiHandler = inject(WeatherApiHandler)
  FavoriteHandler = inject(FavoriteHandler)

  ngOnInit(): void {
    const sofiaCityKey = "51097";
      this.WeatherApiHandler.getCurrentWeather(sofiaCityKey).subscribe(weatherData => {
        this.currentWeather[sofiaCityKey] = weatherData[0];
        console.log(this.currentWeather)})
    };

  searchCity (city: string) {
    this.cities = []  
    this.WeatherApiHandler.getCityAutocomplete(city).subscribe(data => {
      this.cities = data;
      this.cities.forEach((city: any) => {
        this.WeatherApiHandler.getCurrentWeather(city.Key).subscribe(weatherData => {
          this.currentWeather[city.Key] = weatherData[0];
          console.log(this.currentWeather)
        });
      });
    });
    this.selectedCity = {}
    this.forecast = {}
  }
  

  selectCity(city: any): void {
    this.selectedCity = city;
    this.WeatherApiHandler.get5DayForecast(city.Key).subscribe(data => {
      this.forecast = data;
      this.forecast["Key"] = city.Key
    });
  }

  toggleFavorite(city: any): void {
    if (this.FavoriteHandler.isFavorite(city.Key)) {
      this.FavoriteHandler.removeFavorite(city.Key);
    } else {
      this.FavoriteHandler.addFavorite(city);
    }
  }


  getDayOfWeek(dateString: string): string {
    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }

  toggleCelsiusToFahrenheit(unit: string): void {
    this.temperatureUnit = unit === 'F' ? 'C' : 'F';
  }
}
