validation_checks = 
{
	required:
	function(value)
	{
		return (value != null && value.length > 0);
	},

	length:
	function(value,min,max)
	{
		return (value != null && value.length >= min && value.length <= max);
	},
	
	isInt:
	function(value)
	{
  		return (value != null && value.toString().search(/^-?[0-9]+$/) == 0);
	}
}

function validateClientSide(form) 
{
    for(var key in properties)
	{
 		for(var i = 0; i < properties[key].validationsToPerform.length; i ++)
		{
 			funcarray = properties[key].validationsToPerform[i].split("-");
			funcToCall = funcarray[0];
			
			if(form[key].type == "text" || form[key].type == "hidden" || form[key].type == "password"
			|| form[key].type == "textarea" || form[key].type == "select")
			{
				funcarray[0] = form[key].value;	
			}
			else if(form[key].type == 'checkbox')
			{
				if (form[key].checked)
				{
					funcarray[0] = form[key].name;
				}
				else
				{
					funcarray[0] = null;	
				}
			}
			else if(form[key][0].type == 'radio')
			{
				funcarray[0] = null;
				for (i=0;i<form[key].length;i++)
				{
					if (form[key][i].checked)
					{
				 		funcarray[0] = form[key][i].value;
				 		break;
				 	}
				}
			}
			else
			{
				funcarray[0] = null;
			}
			
			if(!validation_checks[funcToCall].apply(this,funcarray))
			{
				alert(properties[key].errorMessages[i]);
				return false;
			}
		}
	}
	return true;
}