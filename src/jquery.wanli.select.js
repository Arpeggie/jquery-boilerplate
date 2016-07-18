/*  jQuery Wanli Select - v0.2.0
    下拉框插件
    Made by 图图
    Build upon jquery.boilerplate.js
    https://github.com/jquery-boilerplate/jquery-boilerplate  */

;( function( $, window, document, undefined ) {

	"use strict";

		// Create the defaults once
		var pluginName = "wanliSelect",
			defaults = {
				source: "",
				nodeText: "name",
				nodeValue: "value"
			};

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.guid = this.guidGenerator();
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend( Plugin.prototype, {
			init: function() {
				var self = this;
				//操作DOM
				$(this.element).after($('\
					<div class="filter-box" style="display: none">\
          				<input type="search"><i class="icon-miscro"></i>\
          				<div class="data-box">\
          				</div>\
  					</div>')
					.attr('id', self.guid));
				var $dropdown = $("#" + self.guid);

				//点击下拉框以外区域关闭下拉框
				$(document).on("click." + self.guid, function(event) { 
					//点击下拉框以外 或 点击输入框
				    if(!$(event.target).closest("[id=" + self.guid + "]").length && !$(event.target).is(self.element)) {
				        if($dropdown.is(":visible")) {
				            $dropdown.hide();
				        }
				    }        
				});

				//正常打开关闭下拉框
				$(this.element).on("click", function(event){
					if($dropdown.is(":visible")) {
			            $dropdown.hide();
			        }else{
			        	$dropdown.show();
			        }
				});

				//使$:contains无视大小写
				$.expr[":"].contains = $.expr.createPseudo(function(arg) {
				    return function( elem ) {
				        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
				    };
				});

				//搜索框键入搜索
				$dropdown.on("keyup", "input", function(event){
					var filter = $(this).val();
					$dropdown.find("li").hide();
					$dropdown.find("li:contains("+filter+")").show();
				});

				//点击选中
				$dropdown.on("click", "li", function(event){
					var chosen = $(this).text();
					var chosenValue = $(this).data("value");
					$(self.element).val(chosen).data("value", chosenValue).trigger('change');
					$dropdown.hide();
				});

				//获取下拉框数据
				//source 要么是object 要么是请求的地址
				if ($.isPlainObject(this.settings.source)) {
					var $ul = self.proliferate(this.settings.source);
					$dropdown.find(".data-box").append($ul);
				}
				else{
					$.getJSON(this.settings.source, function(data){
						var $ul = self.proliferate(data);
						$dropdown.find(".data-box").append($ul);
					});
				}

				//暴露外部可以调用的方法
				//调用： $(self.element).trigger("update", [data])
				$(self.element).on("update", this.update.bind(this));
				$(self.element).on("valueChange", this.valueChange.bind(this));
			},
			guidGenerator: function(){
				return "w" + Date.now().toString().substr(-4);
			},
			proliferate: function(data){
				var self = this;
				var $ul = $("<ul></ul>");
				$.each(data, function(i){
					$ul.append($("<li></li>")
						//还是把value直接显示出来吧
						//.data("value", this[self.settings.nodeValue])
						.attr("data-value", this[self.settings.nodeValue])
						.html(this[self.settings.nodeText]));
				});
				return $ul;
			},
			update: function(event, data){
				var $ul = this.proliferate(data);
				$("#" + this.guid).find(".data-box").empty().append($ul);
			},
			valueChange: function(event, data){
				var chosen = data.name || $(this.element).val();
				//如果没有给value值，要不要去下拉框列表里面做筛选?
				var chosenValue = data.value || "";
				$(this.element).val(chosen).data("value", chosenValue).trigger('change');
			},
		} );

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
