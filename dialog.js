(function($)
{        
    $.meereenButton = function(param)
    {
        // Default options
        var settings = $.extend({
            background: ''
            , width: ''
            , height: ''
            , border: 'none'            
            , position: 'relative'
        }, param);
        
        var $button = $('<div>');
        $button.css({
                  width: settings.width
                  , height: settings.height
                  , background: settings.background
                });
        $button.addClass(settings.styleButton);

        $button.click(function()
        {
            settings.action();
            return false;
        });      
        
        $button.bind("setEnable", function(event, isEnable)
        {
            if (isEnable)
            {
                $(this).attr('disabled', false);
                $(this).removeClass('button-disable');
                $(this).addClass('button');
            }
            else
            {
                $(this).attr('disabled', true);
                $(this).removeClass('button');
                $(this).addClass('button-disable');
            }

        });
        
        return $button;
        
    };
    
    $.entityDialog = function(dialogID, dialogName, entityProperties, dialogProperties, param)
    {
        // Default options
        var settings = $.extend({
            background: ''
            , maxWidth: '500px'
            , maxHeight: '500px'
            , border: 'none'            
            , position: 'relative'
        }, param);
        
        
        // Entity dialog container
        var $dialogContainer = $('<div>', {id: dialogID});
        
        // Empty the existing content
        $dialogContainer.empty();      

        /**
         *  Apply the classes to DOM object.
         *  (Styles applied using classes will be replaced by the inline css above)
         */
        $dialogContainer.addClass(settings.styleContainer);  
        
        // Entity dialog div
        var $dialog = $("<div>");  
        $dialog.css(
                {
                    margin: 'auto'
                    , width: '100%'
                    , height: '100%'                    
                }
        );
                
        // Create the heder div of the dialog
        var $dialogHeader = $("<div>");
        $dialogHeader.css(
                {
                    margin: 'auto'
                    ,width: '100%'
                    ,height: '33px'
                }
        );
        $dialogHeader.addClass(settings.styleHeader);
        
        // Add dialog heder
        var $dialogName = $('<span>').text(dialogName);
       /* $dialogName.css({'line-height':'33px'});*/
        $dialogHeader.html($dialogName);
        $dialog.append($dialogHeader);
               
        // Create the body div of the dialog
        var $dialogBody = $("<div>");
        
        var $contentField = $.createDialogContentField(entityProperties, dialogProperties, settings.styleField);
        
        var dialogBodyHeight = $contentField.outerHeight(true);
        $dialogBody.append($contentField);
        
        $dialog.append($dialogBody);      
        
        // Create the heder div of the dialog
        var $dialogFooter = $("<div>");
        $dialogFooter.css(
                {
                    margin: 'auto'
                    ,width: '100%'
                    ,height: '33px'                    
                }
        );
        $dialogFooter.addClass(settings.styleFooter);
        
        if (param.buttons)
        {
            var $button = $('<div>');
            
            $.each(param.buttons, function(buttonName, buttonObject)
            {                             
              var $cloneButton = $button.clone();
              $cloneButton.html(buttonName);
              $cloneButton.addClass(buttonObject.class);
              

                $cloneButton.click(function()
                {                     
                    if (buttonObject.action($(this)))
                    {                       
                        $.glassPane.hide($dialogContainer.parent());
                        $dialogContainer.remove();                        
                    }
                    return false;
                });
                $dialogFooter.append($cloneButton);
            });
        }

        $dialog.append($dialogFooter);  
        
        var dialogBodyMaximumHeight = parseInt(settings.maxHeight) - $dialogHeader.outerHeight(true) - $dialogFooter.outerHeight(true);    
        if (dialogBodyHeight > dialogBodyMaximumHeight)
        {
            dialogBodyHeight = dialogBodyMaximumHeight;
        }

        $dialogBody.css(
                {
                    margin: 'auto'
                    , height: dialogBodyHeight
                    , width: '100%'
                }
        );
        $dialogBody.addClass(settings.styleBody);
        
        
        
        // Append dialog to dialog container
        $dialogContainer.append($dialog); 

        var containerHeight = $dialogHeader.outerHeight(true)+ $dialogBody.outerHeight(true)+ $dialogFooter.outerHeight(true);
        
        if(containerHeight > parseInt(settings.maxHeight))
        {
            containerHeight = parseInt(settings.maxHeight);
        }

        // Apply inline css style for the container                
        $dialogContainer.css(
                {
                    width: settings.maxWidth                    
                    , height: containerHeight 
                    , margin: 'auto'
                    , top: (($(document.body).height() / 2) - (containerHeight / 2))
                    , position: settings.position
                    , background: settings.background
                }
        );

        $dialogContainer.hide().appendTo(document.body).fadeIn();
        // Wrap entity Dialog by glass pane 
        $dialogContainer.wrap($.glassPane());
        
        $dialogBody.mCustomScrollbar({
            snapAmount: 40,
            scrollButtons: {enable: true},
            keyboard: {scrollAmount: 40},
            mouseWheel: {deltaFactor: 40},
            scrollInertia: 400
        });
        
        // Center the dialog panel if the window is resized
        $(window).resize(function() 
        {          
            $dialogContainer.css({top: (($(document.body).height() / 2) - (containerHeight / 2))});
        });
    };
    
    /**
     * Create confirmation dialog
     * @param {type} dialogName
     * @param {type} message
     * @param {type} param
     * @returns {undefined}
     */
    $.customDialog = function(dialogName, message, param)
    {
        // Default options
        var settings = $.extend({
            background: ''
            , maxWidth: '500px'
            , maxHeight: '300px'
            , border: 'none'            
            , position: 'relative'
        }, param);
        
        /** 
         * Create dialog a unique ID 
         * Replace the dialog name spaces with underscore mark
         **/
        var dialogID = 'meereenConfirmation_' + dialogName.replace(/\s+/g,"_");
               // Entity dialog container
        var $dialogContainer = $('<div>', {id: dialogID});
        
        // Empty the existing content
        $dialogContainer.empty();  
        // Entity dialog div
        var $dialog = $("<div>");  
        $dialog.css(
                {
                    margin: 'auto'
                    , width: '100%'
                    , height: '100%'                    
                }
        );
                
        // Create the heder div of the dialog
        var $dialogHeader = $("<div>");
        $dialogHeader.css(
                {
                    margin: 'auto'
                    ,width: '100%'
                    ,height: '33px'
                }
        );
        $dialogHeader.addClass(settings.styleHeader);
        
        // Add dialog heder
        var $dialogName = $('<span>').text(dialogName);
        $dialogHeader.html($dialogName);
        $dialog.append($dialogHeader);
               
        // Create the body div of the dialog
        var $dialogBody = $("<div>");        
        
        $dialogBody.append(message);

        $dialogBody.addClass(settings.styleBody); 
        $dialog.append($dialogBody);
        
        // Create the heder div of the dialog
        var $dialogFooter = $("<div>");
        if (param.buttons)
        {
            var $button = $('<div>');
            
            $.each(param.buttons, function(buttonName, buttonObject)
            {                             
              var $cloneButton = $button.clone();
              $cloneButton.html(buttonName);
              $cloneButton.addClass(buttonObject.class);
              

                $cloneButton.click(function()
                {                     
                    if (buttonObject.action($(this)))
                    {                       
                        $.glassPane.hide($dialogContainer.parent());
                        $dialogContainer.remove();                        
                    }
                    return false;
                });
                $dialogFooter.append($cloneButton);
            });
        }        

        $dialogFooter.css(
                {
                    margin: 'auto'
                    ,width: '100%'
                    ,height: '33px'
                    ,position:'absolute'
                });
        
        $dialog.append($dialogFooter);
        // Append dialog to dialog container
        $dialogContainer.append($dialog); 


        $dialogBody.css(
                {
                    margin: 'auto'
                    , height: (parseInt(settings.maxHeight) - ($dialogHeader.outerHeight(true) + $dialogFooter.outerHeight(true)))
                    , width: '100%'
                    , padding: '10px'
                }
        );
        

        var containerHeight = $dialogHeader.outerHeight(true)+ $dialogBody.outerHeight(true)+ $dialogFooter.outerHeight(true);
        
        if(containerHeight > parseInt(settings.maxHeight))
        {
            containerHeight = parseInt(settings.maxHeight);
        }
        
        
        // Apply inline css style for the container                
        $dialogContainer.css(
                {
                    width: settings.maxWidth                    
                    , height: containerHeight
                    , margin: 'auto'
                    , top: (($(document.body).height() / 2) - (containerHeight  / 2))
                    , position: settings.position
                    , background: settings.background
                }
        );

        $dialogContainer.addClass(settings.styleContainer);  
        $dialogContainer.appendTo($(document.body)).fadeIn();
        //$dialogContainer.appendTo($appendTo).fadeIn();
        // Wrap entity Dialog by glass pane 
        var $glasspane = $.glassPane();
        $dialogContainer.wrap($glasspane);
        $dialogBody.mCustomScrollbar({
            snapAmount: 40,
            scrollButtons: {enable: true},
            keyboard: {scrollAmount: 40},
            mouseWheel: {deltaFactor: 40},
            scrollInertia: 400
        });
        
        // Center the dialog panel if the window is resized
        $(window).resize(function() 
        {          
            $dialogContainer.css({top: (($(document.body).height() / 2) - (containerHeight / 2))});
        });        
        
        return dialogID;
    };    

    /**
     * Create dialog content field
     * @param {type} entityProperties
     * @param {type} dialogProperties
     * @param {type} styleField
     * @returns {$}
     */
    $.createDialogContentField = function(entityProperties, dialogProperties, styleField)
    {  
        var $contentFieldContainer = $('<div>');
        var height = 0;
        $.each(dialogProperties, function(elementName, property)
        {
            if (property instanceof Function)
            {
                return true;
            }
            
            var $contentField = $('<div>');
            $contentField.css({padding: '3px', height: '40px', 'margin': '0 15px 0 15px', position: 'relative'});
            $contentField.addClass('meereen_contentFieldLabl_Inpt');
            // Style field will apply the same class to all the content fields                        
            $contentField.addClass(styleField);
            // property.style may vary from each content field
            $contentField.addClass(property.style);

            if(INPUTTYPE.hasOwnProperty(property.inputtype))
            {
                var propertyValue;
                // If has entity property display the value else display default value
                if(entityProperties[elementName])
                {
                    propertyValue = entityProperties[elementName];
                }
                else
                {
                    propertyValue = property.defaultval;
                }
                
                var functions = '';
                if(property.functions)
                {
                    $.each(property.functions, function (attribute, functionObject)
                    {

                        if ($.isEmptyObject(functionObject))
                        {
                            return;
                        }
                        // key contains the function attribute
                        var key = Object.keys(functionObject)[0];
                        var functionString = functionObject[key].toString();
                        // function body (white spaces are removed)
                        var func = functionString.substring(functionString.indexOf("{") + 1, functionString.lastIndexOf("}"));
                        func = func.replace(/\s/g, ' ');
                        func = func.replace(/"/g, "'");
                        var functionBody = JSON.stringify(func);                      
                        functions += key + ' = ' + functionBody;
                    });
                }

                var inputField = '';
                if (property.inputtype === INPUTTYPE.Input)
                {
                    inputField = '<div class="meereen_contentFieldInput"><input id="'
                            + elementName + '"  data-priorvalue="' + propertyValue + '"' + functions + 'type="text" value = "'
                            + propertyValue + '" ></input></div>';
                }
                else if (property.inputtype === INPUTTYPE.Combobox)
                {
                    var optionSelected = '';

                    inputField = '<div class="meereen_contentFieldCombo" >';
                    inputField += '<select id="' + elementName + '" data-priorvalue="' + propertyValue + '" '+functions+' style="box-sizing:content-box; width:100%; ">';
                    $.each(property.options, function(index, val)
                    {                        
                        // If the option is selected
                        if (val === propertyValue)
                        {
                            optionSelected = 'selected';
                        }
                        inputField += '<option ' + optionSelected + ' value="' + val + '">' + val + '</option>';
                        // Empty the value afterwords
                        optionSelected = '';
                    });
                    inputField += '</select>';
                    inputField += '</div>';
                } 
                else if(property.inputtype === INPUTTYPE.Label)
                {                    
                    inputField = '<div class="meereen_contentFieldLabel"><label id="' 
                            + elementName + '">' + propertyValue + ' </label></div>';  
                }
                else if (property.inputtype === INPUTTYPE.Checkbox)
                {
                    inputField = '<div class="meereen_contentFieldCheck"><div class="squaredCheckBox">';
                    inputField += '<input type="checkbox" '+functions+' value="roads" id="'+elementName+'" name="check" ><label for="abc"></label>';
                    inputField += '</div></div>';
                }
                else if(property.inputtype === INPUTTYPE.Selector)
                {                                                                  
                    var selectorParams = {options:{entityData: property.options, 'selectedData': propertyValue}};                
                    var $actionField = UTILITIES.getInputField(UTILITIES.InputFieldCategoty.EntitySelector, selectorParams);
                    $actionField.input.addClass('meereen_contentFieldCombo');
                    $actionField.input.find('select').attr('id', elementName);
                    inputField = $actionField.input;
                }
                
                var $inputLabel = $('<div>');
                $inputLabel.addClass('meereen_contentFieldLabel');                
                $inputLabel.css({height: '40px', width: '50%', float: 'left', 'line-height': '30px', 'white-space': 'nowrap', overflow: 'hidden'});
                $inputLabel.text(property.label);
                $contentField.append($inputLabel);

                /**
                 * [ToDo] Use input field types from `UTILITIES.InputFieldCategoty`
                 */
                if($actionField && $actionField.input)
                {
                    $contentField.append($actionField.input);
                    $contentField.append('<div class="meereen_contentFieldColon" style="line-height:200%;"> : </div> ');
                    $contentField.css("height", "150px");
                }
                else
                {
                    $contentField.append(inputField + '<div class="meereen_contentFieldColon" style="line-height:200%;"> : </div> ');
                }
                
                height += $contentField.outerHeight(true);
                $contentFieldContainer.append($contentField);
            }
            else
            {
                var $inputLabel = $('<div>');
                $inputLabel.css(
                        {   height: '40px'
                            , width: '100%'
                            , float: 'left'
                            , 'line-height': '30px'
                            , 'white-space': 'nowrap'
                            , overflow: 'hidden'
                            , 'font-weight':'bold'
                            , 'font-size': '15px'
                        });
                $inputLabel.text(property.label);
                $contentField.append($inputLabel);                 
                height += $contentField.outerHeight(true);
                $contentFieldContainer.append($contentField);
                $contentFieldContainer.append($.createDialogContentField(entityProperties, property.element, styleField));
            }

        }); 

        $contentFieldContainer.height(height);
        return $contentFieldContainer;
    };
    
    /**
     * Create glasspane and return
     * @returns {$}
     */
    var glaspane_counter = 0;    
    $.glassPane = function()
    {
        var $glassPane = $('<div>', {id: 'meereenDialogGlassPane' + glaspane_counter++ });
        $glassPane.addClass('meereenDialogGlassPane');
        return $glassPane;
    };
    
    /**
     * Hide the glasspane
     * @returns {undefined}
     */
    $.glassPane.hide = function(id)
    {                
        $(id).fadeOut(function()
        {
            $(this).remove();
        });
        
        return;
    }; 
    
    /**
     * Remove the dialog from DOM
     * @param {type} id
     * @returns {undefined}
     */
    $.removeDialog = function(id)
    {
        var $dialog = $('#' + id);
        $.glassPane.hide($dialog.parent());
        $dialog.remove();        
    };
}(jQuery));