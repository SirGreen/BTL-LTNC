$("form").validate({
    rules: {
        // simple rule, converted to {required:true}
        name: {
            required: true,
            maxlength: 50,
            regex: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/i,
        },

        mobile: {
            required: true,
            regex: /^0([0-9]{9,9})$/,
        },
        email: {
            required: true,
            email: true,
        },
        // compound rule
        password: {
            required: true,
            regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        },
        password_confirmation: {
            required: true,
            equalTo: "[name=password]",
        },
    },
    messages: {
        name: {
            required: "Vui lòng nhập họ và tên",
            maxlength: "Vui lòng không nhập quá 50 ký tự",
            regex: "Vui lòng nhập tên không dấu",
        },
        mobile: {
            required: "Vui lòng nhập số điện thoại",
            regex: "Vui lòng nhập đúng định dạng sdt. vd: 0932538468",
        },

        email: {
            required: "Vui lòng nhập email",
            email: "Vui lòng nhập đúng định dạng email. vd: abc@gmail.com",
        },
        // compound rule
        password: {
            required: "Vui lòng nhập mật khẩu",
            regex: "Vui lòng nhập mật khẩu ít nhất 8 ký tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt. vd: 123456aA@",

        },
        password_confirmation: {
            required: "Vui lòng nhập lại mật khẩu",
            equalTo: "Mật khẩu không trùng khớp",
        },
        return: true,
    },

    submitHandler: function (form) {
        window.location = "admin.html";
        $("#signInButton").click(function () {
            $.ajax({
                type: "POST",
                url: "https://mycloud.server",
                dataType: "json",
                success: function (json) {
                    window.location = "admin.html";
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
