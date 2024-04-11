$("form").validate({
    rules: {
        // simple rule, converted to {required:true}
        name: {
            required: true,
            maxlength: 50,
            regex: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/i
        },

        mobile: {

            required: true,

        },
        email: {
            required: true,

        },
        // compound rule
        password: {
            required: true,

        },
        password_confirmation: {
            required: true,
            equalTo: '[name=password]'
        },
    },
    messages: {
        name: {
            required: 'Vui lòng nhập hãng xe',
            maxlength: 'Vui lòng không nhập quá 50 ký tự',
            regex: 'Vui lòng nhập tên không dấu'
        },
        mobile: {
            required: 'Vui lòng nhập loại xe',
            regex: 'Vui lòng nhập đúng định dạng sdt. vd: 0932538468'
        },

        email: {
            required: 'Vui lòng nhập biển số xe',

        },
        // compound rule
        password: {
            required: 'Vui lòng nhập thời gian bảo hành',

        },
        password_confirmation: {
            required: 'Vui lòng nhập lại mật khẩu',
            equalTo: 'Mật khẩu không trùng khớp'
        },
    },

    submitHandler: function (form) {
        window.location = "driver.html";
        $("#signInButton").click(function () {
            $.ajax({
                type: "POST",
                url: "https://mycloud.server",
                dataType: "json",
                success: function (json) {
                    window.location = "driver.html";
                },
            });
            return false;
        });
    },
});

$.validator.addMethod(
    "regex",
    function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },
    "Please check your input."
);
