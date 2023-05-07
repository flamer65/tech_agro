import convertTemperature, {
  conversionToCelsius,
  conversionToFahrenheit,
} from '../modules/tempConversion';

test('converts Kelvin to Celsius, rounded to one decimal place', () => {
  expect(conversionToCelsius(284)).toBe(10.9);
});

test('converts Kelvin to Fahrenheit, rounded to two decimal places', () => {
  expect(conversionToFahrenheit(284)).toBe(51.53);
});

describe('converts Kelvin to Celsius or Fahrenheit depending on the current state', () => {
  test('converts Kelvin to Celsius and returns a string with the correct symbol', () => {
    const temp = 'celsius';
    expect(convertTemperature(284, temp)).toBe('10.9 °C');
  });

  test('converts Kelvin to Fahrenheit and returns a string with the correct symbol', () => {
    const temp = 'fahrenheit';
    expect(convertTemperature(284, temp)).toBe('51.53 °F');
  });
});
