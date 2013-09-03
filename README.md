JsValidationHelper
==================

Very simple, client side validation helper. Works with any existing javascript frameworks as it is written in plain Javascript.

Following methods are available:

* Validation.IsNullOrWhitespace(arg) - is argument null or undefined or contains only white characters
* Validation.IsNull(arg) - is argument null or undefined
* Validation.IsMinLength(arg, minLength) - is argument of length greater than minimal value
* Validation.IsMaxLength(arg, maxLength) - is argument of length smaller than maximal value
* Validation.IsLength(arg, minLength, maxLength) - is argument of length between min and max
* Validation.IsMin(arg, min) - is argument greater than minimal value
* Validation.IsMax(arg, max) - is argument smaller than maximal value
* Validation.IsRange(arg, min, max) - is argument contained between min and max
* Validation.IsPhone(arg) - is argument containing only phone specific characters (i.e. '-', '+', ' ', '#' and digits)
* Validation.IsInteger(arg) - is argument an integer value
* Validation.IsDecimal(arg) - is argument a decimal value
* Validation.IsNumber(arg) - is argument a number
* Validation.IsEmail(arg) - is argument a valid email
* Validation.IsUrl(arg) - is argument a valid url
* Validation.IsDate(arg, minDate, maxDate) - is argument a date in format (dd-MM-yyyy) and is it contained in min and max value
* Validation.IsTime(arg) - is argument a time in format HH:MM
