﻿'use strict';

define(['core/app/detourService'], function(detour) {
    detour.registerController([
        'OptionItemsCtrl',
        ['$rootScope', '$scope', 'logger', '$detour', '$resource', '$stateParams','optionItemDataService',
            function ($rootScope, $scope, logger, $detour, $resource, $stateParams, optionItemDataService) {
                
                var optionColumnDefs = [
                    { name: 'Id', label: 'Id', sorttype:'int', hidden: true },
                    {
                        name: 'Name', label: 'Value', width: 295,
                        formatter: $rootScope.cellLinkTemplate,
                        formatoptions: { editRow: true }
                    },
                    { name: 'Selectable', label: 'Selectable', width: 291},
                    { name: 'Weight', label: 'Weight', sorttype: 'int', width: 291 }
                ];

                $scope.gridOptions = {
                    url: "api/OptionSet/OptionItem/?optionSetId=" + $scope.optionSetId,
                    colModel: optionColumnDefs
                };
                angular.extend($scope.gridOptions, $rootScope.defaultGridOptions);

                $scope.add = function() {
                    $scope.itemValue = '';
                    $scope.itemSelectable = true;
                    $scope.editFunc = createItemFunc;
                    $('#editModal').modal({
                        backdrop: 'static',
                        keyboard: true
                    });
                };

                $scope.edit = function (paramString) {
                    var item = JSON.parse(paramString);
                    $scope.itemId = item.Id;
                    $scope.itemValue = item.Name;
                    $scope.itemSelectable = item.Selectable;
                    $scope.itemWeight = item.Weight;
                    $scope.editFunc = editItemFunc;
                    $('#editModal').modal({
                        backdrop: 'static',
                        keyboard: true
                    });
                };

                function createItemFunc() {
                    $('#editModal').modal('hide');
                    optionItemDataService.save({
                            optionSetId: $scope.optionSetId,
                            name: $scope.itemValue,
                            selectable: $scope.itemSelectable,
                            weight: $scope.itemWeight
                        }, function() {
                            $scope.getOptionItems();
                        }, function(response) {
                            logger.error("Failed to add:\n" + response.data.Text);
                        });
                }

                function editItemFunc() {
                    $('#editModal').modal('hide');
                    optionItemDataService.update({
                            id: $scope.itemId,
                            name: $scope.itemValue,
                            selectable: $scope.itemSelectable,
                            weight: $scope.itemWeight
                        }, function() {
                            $scope.getOptionItems();
                            //logger.success("Update the item successful.");
                        }, function() {
                            logger.error("Failed to update the item.");
                        });
                }

                $scope.delete = function(itemId) {
                    $scope.itemId = itemId;
                    $('#deleteModal').modal({
                        backdrop: 'static',
                        keyboard: true
                    });
                };
                $scope.deleteItem = function() {
                    $('#deleteModal').modal('hide');
                    optionItemDataService.delete({ Id: $scope.itemId }, function () {
                        $scope.getOptionItems();
                        logger.success("Delete the item successful.");
                    }, function() {
                        logger.error("Failed to delete the item.");
                    });
                };

                $scope.getOptionItems = function () {
                    $("#itemList").jqGrid('setGridParam', {
                        datatype: "json"
                    }).trigger('reloadGrid');
                };
            }
        ]
    ]);
});
