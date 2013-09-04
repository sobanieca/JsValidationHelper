/*
	
	Author: Adam Sobaniec 
	(some functions have been taken from other sources. Check comments for more information)
	Email: sobanieca@gmail.com
	Created on: 20-05-2012
	
	Javascript Validation Helper
	Ver. 1.0.0
	
	This is a very simple Javascript validation helper that is supposed to perform
	common validation operations on any form data. It works on the following basis:
	1. You need to retrieve the particular data from a form field (for example by using jQuery)
	2. You can perform a validation check using JS validation helper inside an if condition.
	
	Sample usage:
	
	var username = $("#username").val();
	if(Validation.IsNullOrWhiteSpace(username))
	{
		alert('Username cannot be empty!');
		return false;
	}

*/

function Validation()
{
    this.IsNullOrWhiteSpace = function (val)
    {
        if(val == null || val == "" || val == undefined)
            return true;
        if(val.replace(/^\s+|\s+$/g, '') == "")
            return true;
        return false;
    }
	
    this.IsNull = function(val)
    {
        if(val == null || val == undefined)
            return true;
        return false;
    }
	
    this.IsMinLength = function(val, minLength)
    {
        if(val.length < minLength)
            return false;
        return true;
    }
	
    this.IsMaxLength = function(val, maxLength)
    {
        if(val.length > maxLength)
            return false;
        return true;
    }
	
    this.IsLength = function(val, minLength, maxLength)
    {
        if(val.length >= minLength && val.length <= maxLength)
            return true;
        return false;
    }
	
    this.IsMin = function(val, min)
    {
        if(val == null || val == "" || val == undefined)
            return false;
	
        var number = parseInt(val);
		
        if(isNaN(number) || !isFinite(number))
            return false;
        if(number < min)
            return false;
        return true;
    }
	
    this.IsMax = function(val, max)
    {
        if(val == null || val == "" || val == undefined)
            return false;
	
        var number = parseInt(val);
		
        if(isNaN(number) || !isFinite(number))
            return false;
        if(number > max)
            return false;
        return true;
    }
	
    this.IsRange = function(val, min, max)
    {
        if(val == null || val == "" || val == undefined)
            return false;
	
        var number = parseInt(val);
		
        if(isNaN(number) || !isFinite(number))
            return false;
        if(number >= min && number <= max)
            return true;
        return false;
    }
	
    //Performs a validation if the passed value contain only phone valid chars i.e. '-', ' ', '+', '#' and digits
    this.IsPhone = function(val)
    {
        if(val == null || val == "" || val == undefined)
            return false;
	
        var validPhoneChars = "-+# 1234567890";
        for(var i = 0; i < val.length; i++)
        {
            var ch = val.charAt(i);
            if(validPhoneChars.indexOf(ch) == -1)
                return false;
        }
        return true;
    }
	
    this.IsInteger = function(val)
    {
        if(val == null || val == undefined || isNaN(val))
            return false;
        if(typeof(val) == "number")
        {
            if(val.toString().indexOf('.') == -1)
                return true;
            else
                return false;
        }
        if(val.indexOf('.') != -1 || val.indexOf(',') != -1)
        {
            return false;
        }
        var parsed = parseInt(val);
        if(!isNaN(parsed) && isFinite(parsed))
            return true;
        return false;
    }
	
    this.IsDecimal = function(val)
    {
        if(val == null || val == undefined || isNaN(val))
            return false;
        if(typeof(val) == "number")
        {
            if(val.toString().indexOf('.') != -1)
                return true;
            else
                return false;
        }

        var parsed = parseFloat(val);
        if(!isNaN(parsed) && isFinite(parsed))
            return true;
        return false;
    }
	
    this.IsNumber = function(val)
    {
        if(this.IsInteger(val) || this.IsDecimal(val))
            return true;
        return false;
    }
	
    this.IsEmail = function(email)
    {
        //Basic test against null or empty string
        if (this.IsNullOrWhiteSpace(email))
            return false;

        //Length limit
        if (!this.IsLength(email, 4, 120))
            return false;

        //First char dot
        if (email.charAt(0) == '.')
            return false;

        //Prohibited char combinations
        if (email.indexOf("..") != -1)
            return false;
        if (email.indexOf(".@") != -1)
            return false;
        if (email.indexOf("_@") != -1)
            return false;
        if (email.indexOf("+@") != -1)
            return false;
        if (email.indexOf("-@") != -1)
            return false;

        //Lowering all email letters
        email = email.toLowerCase();

        //Spliting against '@' to obtain local and host part
        var arrMain = email.split('@');

        //Verifying that there are exactly two arrays after split
        if (arrMain.length != 2)
            return false;

        //Veryfing that local part is not empty
        if (arrMain[0].length == 0)
            return false;

        //Veryfing that host part contains more than 1 character
        if (arrMain[1].length < 2)
            return false;

        //Validating local part email permitted characters
        for (var i = 0; i < arrMain[0].length; i++)
            if (!this.IsValidEmailChar(arrMain[0][i]))
                return false;

        //Checking if last char is not '.' or "-"
        if (arrMain[1][arrMain[1].length - 1] == '.' || arrMain[1][arrMain[1].length - 1] == '-')
            return false;

        //Veryfing host part characters
        for (var i = 0; i < arrMain[1].length; i++)
            if (!this.IsValidUrlChar(arrMain[1][i]))
                return false;
        
        //Veryfing that there is at least one dot in host url
        var arrHost = arrMain[1].split('.');
        if (arrHost.length < 2)
            return false;

        //Veryfing that host part contains not empty parts and parts of length greater than 1
        for (var i = 0; i < arrHost.length; i++)
        {
            var hostPart = arrHost[i];
			if (this.IsNullOrWhiteSpace(hostPart))
				return false;
            if (hostPart.length < 1)
                return false;
        }

        return true;
    }

    this.IsValidEmailChar = function(c)
    {
        var validEmailChars = "0123456789abcdefghijklmnopqrstuwvxyz+.-_";
        if (validEmailChars.indexOf(c) == -1)
            return false;
        return true;
    }

    this.IsValidUrlChar = function (c)
    {
        var validUrlChars = "0123456789abcdefghijklmnopqrstuwvxyz.-";
        if (validUrlChars.indexOf(c) == -1)
            return false;
        return true;
    }
	
    this.IsUrl = function(val)
    {
        //This regular expression I have taken from the jQuery validation source code.
        //It has been created by Scott Gonzalez: http://projects.scottsplayground.com/iri/
        return 	/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(val);
    }
	
    //Validates against following date formats:
    //dd-mm-yyyy
    //dd/mm/yyyy
    this.IsDate = function(val, argMinYear, argMaxYear)
    {
        //Code taken from http://www.the-art-of-web.com/javascript/validate-date
        //and slightly modified
		
        if(val == null || val == "" || val == undefined)
            return false;
		
        var minYear = 1900;
        var maxYear = 2100;
        if(argMinYear)
            minYear = argMinYear;
        if(argMaxYear)
            maxYear = argMaxYear;

        // regular expression to match required date format
        re = /^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/;

        if(regs = val.match(re)) 
        {
            if(regs[1] < 1 || regs[1] > 31) 
            {
                return false;
            } 
            else if(regs[2] < 1 || regs[2] > 12) 
            {
                return false;
            } 
            else if(regs[3] < minYear || regs[3] > maxYear) 
            {
                return false;
            }
        } 
        else 
        {
            return false
        }

        return true;
    }
	
    //Validates time in format HH:mm
    this.IsTime = function(val)
    {
        //Code taken from http://www.the-art-of-web.com/javascript/validate-date
        //and slightly modified
		
        //regular expression to match required time format
        re = /^(\d{1,2}):(\d{2})(:00)?([ap]m)?$/;
		
        if(val == null || val == "" || val == undefined)
            return false;

        if(regs = val.match(re)) {
            if(regs[4]) {
                // 12-hour time format with am/pm
                if(regs[1] < 1 || regs[1] > 12) {
                    return false;
                }
            } else {
                // 24-hour time format
                if(regs[1] > 23) {
                    return false;
                }
            }
            if(regs[2] > 59) {
                return false;
            }
        } 
        else 
        {
            return false;
        }

        return true;
    }

    this.ContainsChar = function(val, chars)
    {
        for (var i = 0; i < val.length; i++)
        {
            var c = val.charAt(i);
            if (chars.indexOf(c) != -1)
                return true;
        }
        return false;
    }
}

var Validation = new Validation();