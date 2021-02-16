# EP1 Tracking Server

## Setup

``` 
$ npm i 
$ npm start
```

## WebApp

https://ep1tracker.azurewebsites.net
https://ep1tracker.azurewebsites.net/epallets

## iOS

let urlString = "https://ep1tracker.azurewebsites.net/issuesList"
let url = URL(string: urlString)
let task = URLSession.shared.dataTask(with: url!) { (data, response, error) in
    if let error = error {
        print("error occured: \(error)")
    } else {
        do {
            let serialized = try JSONSerialization.jsonObject(with: data!, options: []) as? [String: Any]
            print("serialized: \(serialized)")
        } catch {
            print("JSON error: \(error)")
        }
    }
}

task.resume()
```

