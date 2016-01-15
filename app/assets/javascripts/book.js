function enableAuthorityTypeahead(obj) {
    obj.find('[data-function="authority-typahead"]').not(".tt-input").not(".tt-hint").each(function(){
       $(this).authority_typeahead({model: $(this).attr('data-model')});
    });
}


function disableAuthorityTypeahead(obj) {
    obj.find('[data-function="authority-typahead"]').not(".tt-input").not(".tt-hint").authority_typeahead({remove: true});
}

function updateIndex(index,input) {
    var regex = new RegExp(/[0-9]/);
    // some of the inputs have no id, some have no name!
    var num;
    if (typeof(input.name) !== 'undefined' && input.name.length > 0) {
        num = parseInt(regex.exec(input.name));
    } else {
        if (typeof(input.id !== 'undefined') && input.id.length > 0) {
            num = parseInt(regex.exec(input.id));
        } else {
            if (typeof($(input).attr('data-target')) !== 'undefined') {
                num = parseInt(regex.exec($(input).attr('data-target')))
            }
        }
    }
    if (typeof(num) !== 'undefined') {
        var inc = num + 1;
        if (typeof(input.name) !== 'undefined') {
            var updated_name = input.name.replace(num.toString(), inc.toString());
            $(input).attr('name', updated_name);
        }
        if (typeof(input.id) !== 'undefined') {
            var updated_id = input.id.replace(num.toString(), inc.toString());
            $(input).attr('id', updated_id);
        }
        if (typeof($(input).attr('data-target')) !== 'undefined') {
            var updated_id = $(input).attr('data-target').replace(num.toString(), inc.toString());
            $(input).attr('data-target', updated_id)
        }
        $(input).val('');
    }
}

$(document).ready(function() {
    enableAuthorityTypeahead($(":root"));



    $('[data-function="clone-fields"]').click(function(e){
        e.preventDefault();
        var selector = $(this).attr('data-selector'); // cloning messes up the data() method
        var $fields = $(selector);
        disableAuthorityTypeahead($fields);
        var $new_fields = $fields.clone(true);
        $new_fields.show();
        // Update all name and id attributes before pasting in the clone
        $new_fields.find(':input').each(updateIndex);
        $new_fields.find('a[data-target]').each(updateIndex);
        $($new_fields).each(updateIndex);

        //now - stick them into the DOM!
        $new_fields.insertAfter($fields);

        enableAuthorityTypeahead($fields);
        enableAuthorityTypeahead($new_fields);
    });

    $('[data-function="delete-fields"]').click(function(e){
        e.preventDefault()
        var selector = $(this).attr('data-target'); //cloning messes up the data() method
        $(selector).hide();
        $(selector).find("input[id$='_destroy']").val('1');
    });

});