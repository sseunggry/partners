// date, daterange, time picker

/**
 * https://iamkumaran.github.io/daterangepicker-dayjs/index.html#examples
 * daterangepicker.js
 * dayjs.min.js
 * dayjs.plugin.combine.js
 */

dayjs.extend(window.dayjs_plugin_localeData);
dayjs.extend(window.dayjs_plugin_localizedFormat);
dayjs.extend(window.dayjs_plugin_isoWeek);
dayjs.extend(window.dayjs_plugin_arraySupport);
dayjs.extend(window.dayjs_plugin_badMutable);
dayjs.extend(window.dayjs_plugin_weekOfYear);
 
let nowDate = dayjs();
let lastMonth = nowDate.subtract(1, "month").format();
 
$(function() {
	// daterange
	$("input[name=\"daterange\"]").daterangepicker({
		drops: "auto",
		locale: {
			format: "YYYY.MM.DD",
			language: "kr",
			separator: " ~ ",
			applyLabel: "확인",
			cancelLabel: "닫기",
		},
		// startDate: lastMonth,
	});
	// only datepicker single
	$("input[name=\"datepicker\"]").daterangepicker({
		drops: "auto",
		singleDatePicker: true,
		locale : {
			format: "YYYY.MM.DD",
			language: "kr",
			separator: " ~ ",
			applyLabel: "확인",
			cancelLabel: "닫기",
		}
	});
	// datepicker single with time
	$("input[name=\"datepickerTime\"]").daterangepicker({
		drops: "auto",
		singleDatePicker: true,
		timePicker : true,
		timePicker24Hour : true,
		timePickerIncrement : 1,
		timePickerSeconds : false,
		locale: {
			format: "YYYY.MM.DD HH:mm",
			language: "kr",
			separator: " ~ ",
			applyLabel: "확인",
			cancelLabel: "닫기",
		},
		startDate: lastMonth,
	});
	// only timepicker single
	$("input[name=\"timepicker\"]").daterangepicker({
		drops: "auto",
		timePicker : true,
		singleDatePicker: true,
		timePicker24Hour : true,
		timePickerIncrement : 1,
		timePickerSeconds : false,
		pickDate : false,
		locale : {
			format : "HH:mm",
			language: "kr",
			separator: " ~ ",
			applyLabel: "확인",
			cancelLabel: "닫기",
		}
	}).on("showCalendar.daterangepicker", function (ev, picker) {
		picker.container.find(".calendar-table").hide();
		picker.container.addClass("time-single");
	});
	// daterange + timepicker
	$("input[name=\"daterangeTime\"]").daterangepicker({
		drops: "auto",
		timePicker : true,
		timePicker24Hour : true,
		timePickerIncrement : 1,
		timePickerSeconds : false,
		locale: {
			format: "YYYY.MM.DD HH:mm",
			language: "kr",
			separator: " ~ ",
			applyLabel: "확인",
			cancelLabel: "닫기",
		},
		startDate: lastMonth,
	});
});