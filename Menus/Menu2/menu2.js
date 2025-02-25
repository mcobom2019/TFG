AFRAME.registerComponent('createsons', {
    init: function () {
        var el = this.el;
        var scene = document.querySelector("a-scene");
        var menuPanel = null;
        var barChartEntity = null; // Diagrama de barras
        var barsEntity = null; // Diagrama de barras
        var isBarChartVisible = false; // Diagrama de barras
        var pieChartEntity = null; // Diagrama circular
        var pieEntity = null; // Diagrama circular
        var isPieChartVisible = false; // Diagrama circular

        el.addEventListener('click', function () {
            if (!menuPanel) {
                var parentPosition = el.getAttribute('position');
                var newPosition = { x: parentPosition.x, y: parentPosition.y + 1.5, z: parentPosition.z };

                // Crear el menú flotante
                menuPanel = document.createElement('a-box');
                menuPanel.setAttribute('width', '1');
                menuPanel.setAttribute('height', '0.7');
                menuPanel.setAttribute('depth', '0.1');
                menuPanel.setAttribute('color', '#333');
                menuPanel.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);

                // Botón grafico de barras
                var barChartButton = document.createElement('a-plane');
                barChartButton.setAttribute('width', '0.6');
                barChartButton.setAttribute('height', '0.2');
                barChartButton.setAttribute('color', 'blue');
                barChartButton.setAttribute('position', '0 0.1 0.06');
                barChartButton.setAttribute('text', 'value: Barras; color: white; align: center; width: 1.5;');
                // Botón grafico circular
                var pieChartButton = document.createElement('a-plane');
                pieChartButton.setAttribute('width', '0.6');
                pieChartButton.setAttribute('height', '0.2');
                pieChartButton.setAttribute('color', 'blue');
                pieChartButton.setAttribute('position', '0 -0.2 0.06');
                pieChartButton.setAttribute('text', 'value: Circular; color: white; align: center; width: 1.5;');
                

                // Al hacer click muestra/cierra el diagrama de barras
                barChartButton.addEventListener('click', function () {
                    if (!isBarChartVisible) {
                        barChartEntity = document.createElement('a-entity');
                        barChartEntity.setAttribute('id', 'data');
                        barChartEntity.setAttribute('babia-queryjson', 'url: ./data.json; path: data');

                        barsEntity = document.createElement('a-entity');
                        barsEntity.setAttribute('babia-barsmap', 'from: data; legend: true; palette: ubuntu; x_axis: model; z_axis: color; height: sales');
                        barsEntity.setAttribute('position', `${newPosition.x+3} ${newPosition.y - 2} ${newPosition.z}`);
                        barsEntity.setAttribute('scale', '0.2 0.2 0.2');

                        scene.appendChild(barChartEntity);
                        scene.appendChild(barsEntity);

                        isBarChartVisible = true;
                    } else {
                        if (barChartEntity && barChartEntity.parentNode) {
                            scene.removeChild(barChartEntity);
                            scene.removeChild(barsEntity);
                            barChartEntity = null;
                            barsEntity = null;
                        }
                        isBarChartVisible = false;
                    }
                });
                // Al hacer click muestra/cierra el diagrama circular
                pieChartButton.addEventListener('click', function () {
                    if (!isPieChartVisible) {
                        pieChartEntity = document.createElement('a-entity');
                        pieChartEntity.setAttribute('id', 'data2');
                        pieChartEntity.setAttribute('babia-queryjson', 'url: ./data.json; path: data2');

                        pieEntity = document.createElement('a-entity');
                        pieEntity.setAttribute('babia-pie', 'from: data2; legend: true; palette: blues; key: model; size: doors;');
                        pieEntity.setAttribute('position', `${newPosition.x+7} ${newPosition.y-1} ${newPosition.z}`);
                        pieEntity.setAttribute('scale', '0.8 0.8 0.8');
                        pieEntity.setAttribute('rotation', '90 0 0');
                      

                        scene.appendChild(pieChartEntity);
                        scene.appendChild(pieEntity);

                        isPieChartVisible = true;
                    } else {
                        if (pieChartEntity && pieChartEntity.parentNode) {
                            scene.removeChild(pieChartEntity);
                            scene.removeChild(pieEntity);
                            pieChartEntity = null;
                            pieEntity = null;
                        }
                        isPieChartVisible = false;
                    }
                });

                // Cerrar el menú y eliminar gráficos
                var closeButton = document.createElement('a-plane');
                closeButton.setAttribute('width', '0.2');
                closeButton.setAttribute('height', '0.2');
                closeButton.setAttribute('color', 'red');
                closeButton.setAttribute('position', '0.4 0.3 0.06');
                closeButton.setAttribute('text', 'value: X; color: white; align: center;');

                closeButton.addEventListener('click', function () {
                    if (menuPanel && menuPanel.parentNode) {
                        menuPanel.parentNode.removeChild(menuPanel);
                        menuPanel = null;
                    }
                    if (barChartEntity && barChartEntity.parentNode) {
                        scene.removeChild(barChartEntity);
                        scene.removeChild(barsEntity);
                        barChartEntity = null;
                        barsEntity = null;
                        isBarChartVisible = false;
                    }if (pieChartEntity && pieChartEntity.parentNode) {
                        scene.removeChild(pieChartEntity);
                        scene.removeChild(pieEntity);
                        pieChartEntity = null;
                        pieEntity = null;
                        isPieChartVisible = false;
                    }
                });

                menuPanel.appendChild(barChartButton);
                menuPanel.appendChild(pieChartButton);
                menuPanel.appendChild(closeButton);
                scene.appendChild(menuPanel);
            }
        });
    }
});