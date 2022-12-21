/* 
 * This file contains code related to dialog field validations.
 */

/*
 * 
 * @type VALIDATIONENUM ENUM contains all the validations used for the dialog fields. 
 * Each validation has a validator function and a default message.
 * Validator function returns true or false based on the value passed.
 */
window.VALIDATIONENUM =
        {
            isEmpty: {
                validator: function(value)
                {
                    if (!value)
                    {
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                },
                message: "The field cannot be empty"},
            isPositiveInteger: {
                validator: function(value)
                {
                    return /^([1-9](\d)*|[0](^\d\w\W)*)$/.test(value);
                },
                message: "Invalid Number"},
            isPositiveIntegerZeroExcluded: {
                validator: function(value)
                {
                    return /^([1-9](\d)*|[1](^\d\w\W)*)$/.test(value);
                },
                message: "Invalid Number"},
            isValidPRF: {
                validator: function(value)
                {
                    return /([1-1][1-7][1-8][1-8])/.test(value);
                },
                message: "Invalid PRF code"},
            isSignedFloat:
                    {
                        
                        validator: function(value)
                        {
                            return /^-?(?:[1-9]\d*|0)(?:\.\d+)?$/.test(value);
                        },
                        message: "Invalid Number"
                    },
            
            isValueInRange:
                    {
                        validator: function(value, preValue, validationData)
                        {
                            return (value <= validationData.max && value >= validationData.min);
                        },
                        message: "Invalid value Range."
                    },             
            customValidation:
                    {
                        validator: function(value, preValue, validationData)
                        {
                            return validationData.validationFunction(value, preValue);
                        },
                        message: "Invalid value."
                    }, 
          
            isFloat: {
                validator: function(value)
                {
                    return /^(?:[1-9]\d*|0)(?:\.\d+)?$/.test(value);
                },
                message: "Invalid Number"},
            isValidDirection: {
                validator: function(value)
                {
                    return /^(360|3[0-5][0-9]|[1-2][0-9]{2}|[1-9][0-9]|[0-9])$/.test(value);
                }, 
                message: "Invalid Direction"},
            isExistingName: {
                validator: function( entry, previousValue)
                {
                    if (previousValue !== undefined && previousValue.toString().toUpperCase() === entry.toString().toUpperCase())
                    {
                        return true;
                    }
                    else if (ISUNIQUEPROPERTY("entityName", entry.toUpperCase()))
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }, 
                message: 'Name should be unique'},
            isExistingCallsign: {
                validator: function(entry, previousValue)
                {
                    if (previousValue !== undefined && previousValue.toString().toUpperCase() === entry.toString().toUpperCase())
                    {
                        return true;
                    }
                    else if (ISUNIQUEPROPERTY("callsign", entry.toUpperCase()))
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }, 
                message: 'The Callsign should be unique'},
            isValidFlyingAltitude: {
                validator: function(value)
                {
                    if(value < 300)
                    {
                        return false;
                    }
                    else
                    {
                         return true;
                    };
                },
                message: 'Invalid Flying Altitude'},
            isValidName: {
                validator: function(value)
                {
                    return /^[^_\s\W]+$/.test(value);
                }, 
                message: "Invalid Text"},
            isValidUnitType: {
                validator: function(value)
                {               
                        if(/[^a-z-\d\s]|[\s]{2,}/i.test(value))
                        {
                            return false;
                        }
                        else
                        {
                            return !(/^\s|\s$/.test(value));
                        }
                }, 
                message: "Invalid Text"},
            isMaxLength: {
                validator: function(value)
                {
                    return value.length < 36 ? true : false;
                }, 
                message: "Invalid character length"},
            isExistingUnitType: {
                validator: function(value, existingName)
                {
                    return CONTEXT.isExistingEntityType(value, existingName);
                }, 
                message: "Name should be unique"},
            isValidMissionName: {
                validator: function(value)
                {
                    if (/^[^\\/?*:;.'|"<>#]+$/.test(value))
                    {
                        if (value.trim() === "")
                        {
                            return false;
                        }
                        else
                        {
                            return true;
                        }
                    }
                }, 
                message: "Invalid mission name"},
            isValidTime: {
                validator: function(value)
                {
                    return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
                }, 
                message: "Invalid Time"},
            isValidHour: {
                validator: function(value)
                {
                    var hour = value.split(':')[0];
                    var intValue = parseInt(value);
                    if (isNaN(hour)) {
                        return false;
                    }
                    else if (value.indexOf('.') > -1) { //bacause parseInt consider '.' as floating point
                        return false;
                    }
                    else if (intValue < 0 || intValue > 23) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }, 
                message: "Invalid Time"},
            isValidMinute: {
                validator: function(value)
                {                    
                    var minute = value.split(':')[1];
                    var intValue;
                    // If colon exist
                    if(value.indexOf(':') > -1)
                    {
                        intValue = parseInt(minute);
                    }
                    else
                    {
                        intValue = parseInt(value);
                    }
                    
                    
                    if (isNaN(minute)) {
                        return false;
                    }
                    else if (value.indexOf('.') > -1) { //bacause parseInt consider '.' as floating point
                        return false;
                    }
                    else if (intValue < 0 || intValue > 59) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }, 
                message: "Invalid Time"
            },
            isValidIPSection: {
                validator: function(value)
                {
                    /*IP validation*/
                    return /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/.test(value);
                },
                message: "Invalid IP Address"
            },
            DISMapping: {
                validator: function(value)
                {
                    return /^(\s*|([0-9](\d)*\s){6}[0-9](\d)*)$/.test(value);
                },
                message: "Invalid Enumeration"
            }
        };
        
/*
 * Class validation
 * @returns {Validation}
 */
{
    function Validation()
    {
    }
    
    var delay = function(time)
    {
        var timeoutID = 0;
        return function(callback) 
        {
            clearTimeout(timeoutID);
            timeoutID = setTimeout(callback, time);// time in milli seconds
        };
    };

    /**
     *  `Validation.Identifiers` contains ID or CLASS identifier text
     */
    Validation.Identifiers =
            {
                /**
                 *  This identifier is bind as a css class to the dilog validatable elements and 
                 *  used to identify validatable elements when applying validations
                 */
                validatableField  : 'validatableField',
                errorMassageField : 'validationError'

            }

    Validation.prototype.validate = function(id, dialogProperties, isPanelInitialLoad, initialValidation, validateHiddenFields)
    {                                                                                                                           
        
        if(dialogProperties)
        {
            // Bind the validaion data to each dialog element          
            $.each(dialogProperties, function (elementName, property)
            {
                // If dialog propertyt contains validations bind them to each related field
                if (property.validations)
                {
                    $('#' + elementName).data({validations: property.validations});
                    $('#' + elementName).addClass(Validation.Identifiers.validatableField);
                }
                else
                {
                    
                    if (property.element)
                    {
                        $.each(property.element, function (elementName, subProperty)
                        {

                            if (subProperty.validations)
                            {
                                $('#' + elementName).data({validations: subProperty.validations});
                                $('#' + elementName).addClass(Validation.Identifiers.validatableField);
                            }

                        });
                    }
                }
            });
        }
        
        
        var form = $("#" + id);
        this._refreshValidations(form);
        var _this = this;
        form.each(function()
        {
            form.find('.'+Validation.Identifiers.validatableField).each(function()
            {
                var validationTypes = $(this).data('validations');
                var elementID = $('#' + $(this).attr("id"));
                var attribute = $(this);
                                
                if( typeof isPanelInitialLoad === "undefined")
                {
                    isPanelInitialLoad = true;
                }
                if( typeof initialValidation === "undefined")
                {
                    initialValidation = true;
                }
                if( typeof validateHiddenFields === "undefined")
                {
                    validateHiddenFields = false;
                }

                if(initialValidation)
                {
                    _this._validateOnEvent(form, validationTypes, elementID, attribute, isPanelInitialLoad, validateHiddenFields);  
                }

                $(this).unbind('keyup').keyup(function()
                {
                    let isPanelInitialLoad = false;
                    // 250ms delay to trigger the key up event
                    delay(250)(_this._validateOnEvent(form, validationTypes, elementID, attribute, isPanelInitialLoad, validateHiddenFields));
                });

                $(this).unbind('focusout').focusout(function()
                {
                    let isPanelInitialLoad = false;
                    _this._validateOnEvent(form, validationTypes, elementID, attribute, isPanelInitialLoad, validateHiddenFields);                   
                }); 
                
                $(this).change(function()
                {
                    let isPanelInitialLoad = false;
                    _this._validateOnEvent(form, validationTypes, elementID, attribute, isPanelInitialLoad, validateHiddenFields); 
                });
            });

        });
    };
    
    Validation.prototype.setButtonStatus = function(panel, status)
    {   
        
        if(status)
        {
            panel.find('.okButton').attr('disabled', false);
            panel.find('.okButton').css({"cursor": "pointer", "background-color": "rgba(30, 30, 153, 0.5)"});
            panel.find('.okButton').removeClass("ok-button-disabled");
        }
        else
        {
            panel.find('.okButton').attr('disabled', true);
            panel.find('.okButton').css({"cursor": "not-allowed", "background-color": "rgba(143, 143, 144, 1)"});
            panel.find('.okButton').addClass("ok-button-disabled");
        }
    };
    
    Validation.prototype._validateOnEvent = function(form, validationTypes, elementID, attribute, isPanelInitialLoad, validateHiddenFields)
    {
        var errorMessage = ''; 
        var entityObject = this;
        this._removeError(elementID);
        var value = "";
        
        if (attribute.attr("id") === "missionHour" || attribute.attr("id") === "missionMin")
        {
            value = $("#missionHour").val() + ":" + $("#missionMin").val();
        }
        /*IP validation*/
        else if(attribute.parent().hasClass("ip-address-wrapper"))
        {
            let ipWrapperFields = attribute.parent().find("input");

            let ipField1 = $(ipWrapperFields[0]).val();
            let ipField2 = $(ipWrapperFields[1]).val();
            let ipField3 = $(ipWrapperFields[2]).val();
            let ipField4 = $(ipWrapperFields[3]).val();

            if(ipField1.trim() === "" && ipField2.trim() === "" && ipField3.trim() === "" && ipField4.trim() === "")
            {
                value = "";
            }
            else
            {
                value = $(ipWrapperFields[0]).val() + "." + $(ipWrapperFields[1]).val() + "." 
                    + $(ipWrapperFields[2]).val() + "." + $(ipWrapperFields[3]).val();
            }
            
        }
        else
        {
            value = attribute.val();
        }
        var previousValue = elementID.attr('data-priorvalue');
        var errorState = false;
        var _this = this;
        validationTypes.some(function(validationType)
        {
            var valid = validationType.validation.validator(value, previousValue, validationType.validationData);
            if (!valid)
            {         
                if (validationType.message)
                {
                    errorMessage = validationType.message;
                }
                else
                {
                    errorMessage = validationType.validation.message;
                }
                errorState = true;
                return true;
            }
            else
            {
                // If validation depends on multiple fields
                if (validationType.validationData && validationType.validationData.dependantFields)
                {
                    var dependantFieldNameArray = validationType.validationData.dependantFields;
                    dependantFieldNameArray.some(function(dependantFieldName)
                    {
                        var $dependantField = $("#" + dependantFieldName);
                        
                        var dependantFieldValue = $dependantField.val();
                        var dependantFieldpriorValue = $dependantField.attr('data-priorvalue');
                        var dependantFieldObj =  $dependantField.find('.'+Validation.Identifiers.validatableField).prevObject;
                        var dependantFieldValidationTypes = dependantFieldObj.data('validations');
                        dependantFieldValidationTypes.some(function(dependantFieldValidationType)
                        {
                            var valid = dependantFieldValidationType.validation.validator(dependantFieldValue, dependantFieldpriorValue, dependantFieldValidationType.validationData);
                            entityObject._removeError(dependantFieldObj);
                            if (!valid)
                            {
                                // Display error message.
                                if (dependantFieldValidationType.message)
                                {
                                    errorMessage = dependantFieldValidationType.message;
                                }
                                else
                                {
                                    errorMessage = dependantFieldValidationType.validation.message;
                                }
                                entityObject._displayError(dependantFieldObj, errorMessage);
                                return true;
                            }

                        });

                    });
                    
                }
            }
        });

        if (errorState)
        {
            if (attribute.attr("id") === "missionHour" || attribute.attr("id") === "missionMin")
            {
                $("#missionHour").attr('valid', false);
                $("#missionMin").attr('valid', false);
            }
            /*IP validation*/
            else if(attribute.parent().hasClass("ip-address-wrapper"))
            {
                let ipWrapperFields = attribute.parent().find("input");
                $(ipWrapperFields[0]).attr('valid', false);
                $(ipWrapperFields[1]).attr('valid', false);
                $(ipWrapperFields[2]).attr('valid', false);
                $(ipWrapperFields[3]).attr('valid', false);
            }
            else
            {
                attribute.attr('valid', false);
            }
            _this.setButtonStatus(form, false);
           
            if (!isPanelInitialLoad)
            {
                _this._displayError(elementID, errorMessage);
            }
        }
        else
        {
            if (attribute.attr("id") === "missionHour" || attribute.attr("id") === "missionMin")
            {
                $("#missionHour").attr('valid', true);
                $("#missionMin").attr('valid', true);
            }
            /*IP validation*/
            else if(attribute.parent().hasClass("ip-address-wrapper"))
            {
                let ipWrapperFields = attribute.parent().find("input");
                $(ipWrapperFields[0]).attr('valid', true);
                $(ipWrapperFields[1]).attr('valid', true);
                $(ipWrapperFields[2]).attr('valid', true);
                $(ipWrapperFields[3]).attr('valid', true);
            }
            else
            {
                attribute.attr('valid', true);
            }
            
            // Enable/disable ok button
            var okButtonEnabled = true;
            var _form = $(form);

            _form.find('.validatableField').each(function()
            {
                var elementID = $('#' + $(this).attr("id"));
                
                if(!validateHiddenFields && !elementID.is(":visible"))
                {
                    return;
                }
                
                var validationTypes = $(this).data('validations');
                var priorValue = $(this).attr('data-priorvalue');
                var value;
                if ($(this).attr("id") === "missionHour" || $(this).attr("id") === "missionMin")
                {
                    value = $("#missionHour").val() + ":" + $("#missionMin").val();
                }
                /*IP validation*/
                else if($(this).parent().hasClass("ip-address-wrapper"))
                {
                    let ipWrapperFields = $(this).parent().find("input");

                    let ipField1 = $(ipWrapperFields[0]).val();
                    let ipField2 = $(ipWrapperFields[1]).val();
                    let ipField3 = $(ipWrapperFields[2]).val();
                    let ipField4 = $(ipWrapperFields[3]).val();

                    if(ipField1.trim() === "" && ipField2.trim() === "" && ipField3.trim() === "" && ipField4.trim() === "")
                    {
                        value = "";
                    }
                    else
                    {
                        value = $(ipWrapperFields[0]).val() + "." + $(ipWrapperFields[1]).val() + "." 
                            + $(ipWrapperFields[2]).val() + "." + $(ipWrapperFields[3]).val();
                    }
                }
                else
                {
                    value = $(this).val();
                }
                
                validationTypes.some(function(validationType)
                {
                    // Enable/Disable Ok button.
                    var valid = validationType.validation.validator(value, priorValue, validationType.validationData);
                    if (!valid)
                    {
                        okButtonEnabled = false;
                        return true;
                    }                   
                });

            });
 
            _this.setButtonStatus(form, okButtonEnabled);
        }
    };
    
    Validation.prototype._refreshValidations = function(panel)
    {
        panel.find('.validatableField').css({"border": "1px solid #c1c1ff", "box-shadow": "0 0 10px #c1c1ff"});
        panel.find('.validatableField').next('.'+Validation.Identifiers.errorMassageField).text("");
    };

    Validation.prototype._removeValidations = function(elements)
    {
        _this = this;
        
        $.each(elements, function (index, property)
        {
            $.each(property, function (elementID, property)
            {                
                _this._removeError($('#' + elementID));
            });
        }); 
    }

    Validation.prototype._removeError = function(elementID)
    {
        elementID.css({"border": "1px solid #c1c1ff", "box-shadow": "0 0 10px #c1c1ff"});  
        $(elementID).parent().find("."+Validation.Identifiers.errorMassageField).remove();
        
        $("#missionHour").css({"border": "1px solid #c1c1ff", "box-shadow": "0 0 10px #c1c1ff"});  
        $("#missionMin").css({"border": "1px solid #c1c1ff", "box-shadow": "0 0 10px #c1c1ff"});  
        $('#timeValidationError').text("");

        /*IP validation*/
        if(elementID.parent().hasClass("ip-address-wrapper"))
        {
            let ipWrapperFields = elementID.parent().find("input");
            $(ipWrapperFields[0]).css({"border": "1px solid #c1c1ff", "box-shadow": "0 0 10px #c1c1ff"});  
            $(ipWrapperFields[1]).css({"border": "1px solid #c1c1ff", "box-shadow": "0 0 10px #c1c1ff"});  
            $(ipWrapperFields[2]).css({"border": "1px solid #c1c1ff", "box-shadow": "0 0 10px #c1c1ff"});  
            $(ipWrapperFields[3]).css({"border": "1px solid #c1c1ff", "box-shadow": "0 0 10px #c1c1ff"});  
        }
    };
    Validation.prototype._displayError = function(elementID, errorMessage)
    {
        if(elementID.attr("id") === "missionHour" ||elementID.attr("id") === "missionMin")
        {
            $("#missionHour").css({"border": "1px solid red", "box-shadow": "0 0 10px #ff3232"});
            $("#missionMin").css({"border": "1px solid red", "box-shadow": "0 0 10px #ff3232"});
            createValidationErrorMessage(elementID, errorMessage);

        }
        /*IP validation*/
        else if(elementID.parent().hasClass("ip-address-wrapper"))
        {
            let ipWrapperFields = elementID.parent().find("input");
            $(ipWrapperFields[0]).css({"border": "1px solid red", "box-shadow": "0 0 10px #ff3232"});
            $(ipWrapperFields[1]).css({"border": "1px solid red", "box-shadow": "0 0 10px #ff3232"});
            $(ipWrapperFields[2]).css({"border": "1px solid red", "box-shadow": "0 0 10px #ff3232"});
            $(ipWrapperFields[3]).css({"border": "1px solid red", "box-shadow": "0 0 10px #ff3232"});
            createValidationErrorMessage(elementID, errorMessage);
        }
        else
        {
            createValidationErrorMessage(elementID, errorMessage);
        }        
        errorMessage ='';
        
        /**
         * Create error field div and append
         * @param {type} elementID
         * @param {type} errorMessage
         * @returns {undefined}
         */
        function createValidationErrorMessage(elementID, errorMessage)
        {
            var $parent = $(elementID).parent();
            // If already has a validation massage
            var hasError = $parent.find('div.' + Validation.Identifiers.errorMassageField).length !== 0;
            if (!hasError)
            {
                var $erroeField = $('<div>');
                $erroeField.css({position: 'relative'});
                $erroeField.addClass(Validation.Identifiers.errorMassageField);
                $erroeField.text(errorMessage);
                $(elementID).css({"border": "1px solid red", "box-shadow": "0 0 10px #ff3232"});
                $(elementID).parent().append($erroeField);
            }

        }
    };
}

