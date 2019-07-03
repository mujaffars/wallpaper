var screenHeight = parseInt($(window).height());
var screenWidth = screenHeight * 56.25 / 100;
var btnchw = screenHeight * 10.25 / 100;

if (screenWidth < screenHeight) {
    var fontSize = parseInt(eval(eval(screenWidth * 7) / 100));
    var recordFontSize = parseInt(eval(eval(screenWidth * 4) / 100));
} else {
    var fontSize = parseInt(eval(eval(screenHeight * 7) / 100));
    var recordFontSize = parseInt(eval(eval(screenHeight * 4) / 100));
}

/**
 * Convert a base64 string in a Blob according to the data and contentType.
 * 
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

/**
 * Create a Image file according to its database64 content only.
 * 
 * @param folderpath {String} The folder where the file will be created
 * @param filename {String} The name of the file that will be created
 * @param content {Base64 String} Important : The content can't contain the following string (data:image/png[or any other format];base64,). Only the base64 string is expected.
 */
function savebase64AsImageFile(folderpath, filename, content, contentType) {
    // Convert the base64 string in a Blob
    var DataBlob = b64toBlob(content, contentType);

    alert("Starting to write the file :3");

    window.resolveLocalFileSystemURL(folderpath, function (dir) {
        alert("Access to the directory granted succesfully");

        try {
            dir.getFile(filename, {create: true}, function (file) {
                alert("File created succesfully.");
                file.createWriter(function (fileWriter) {
                    alert("Writing content to file");
                    fileWriter.write(DataBlob);
                }, function () {
                    alert('Unable to save file in path ' + folderpath);
                });
            });
        } catch (exception) {
            alert(exception);
        }
    });
}

function genModalSkeleton() {
    $('.bs-example-modal-sm').remove();
    var modalSkeleton=$("<div />", {
        "class": "modal bs-example-modal-sm noselect",
        tabindex: "-1",
        role: "dialog",
        'aria-labelledby': "mySmallModalLabel",
        'data-backdrop': "false"
    });
    var modal=$("<div />", {
        "class": "modal-dialog modal-sm"
    });
    var modalContent=$("<div />", {
        "class": "modal-content"
    });
    var modalBody=$("<div />", {
        "id": "modalShellBody",
        "class": "modal-body"
    }).html('Loading...');
    modalContent.append(modalBody);
    modal.append(modalContent);
    modalSkeleton.append(modal);

    return modalSkeleton;
}

function setModalContent(modalSkeleton, forwhat) {
    switch (forwhat) {
        case 'rateUs':
            $.ajax({
                url: 'rateUs.html',
                type: 'GET',
                dataType: 'html',
                async: true,
                error: function () {
                },
                success: function (resp) {
                    $(modalSkeleton).find('#modalShellBody').html('').append(resp);
                    $(modalSkeleton).find('.badgeName').html(forwhat);
                }
            });
            break;
        case 'done':
            $.ajax({
                url: 'done.html',
                type: 'GET',
                dataType: 'html',
                async: true,
                error: function () {
                },
                success: function (resp) {
                    $(modalSkeleton).find('#modalShellBody').html('').append(resp);
                    $(modalSkeleton).find('.trGCorrect').addClass('hide');
                    $(modalSkeleton).find('.trGWrong').addClass('hide');
                    if (pzlDtl.answered==='correct') {
                        $(modalSkeleton).find('.modal-content').addClass('clsModalCorrect');
                        $(modalSkeleton).find('.trGCorrect').removeClass('hide');
                    } else if (pzlDtl.answered==='wrong') {
                        $(modalSkeleton).find('.modal-content').addClass('clsModalWrong');
                        $(modalSkeleton).find('.trGWrong').removeClass('hide');
                    }

                    $(modalSkeleton).find(".fa-forward").click(function () {
                        $(modalSkeleton).modal('hide')
                        getpuzzle();
                    })

                    $(modalSkeleton).find(".modalClose").click(function () {
                        $(modalSkeleton).modal('hide');
                        showingModal=false;
                    })
                }
            });
            break;
        case 'insuff':
            $.ajax({
                url: 'insuff.html',
                type: 'GET',
                dataType: 'html',
                async: true,
                error: function () {
                },
                success: function (resp) {
                    $(modalSkeleton).find('#modalShellBody').html('').append(resp);
                }
            });
            break;
        case 'rewardCoins':
            $.ajax({
                url: 'rewardCoins.html',
                type: 'GET',
                dataType: 'html',
                async: true,
                error: function () {
                },
                success: function (resp) {
                    $(modalSkeleton).find('#modalShellBody').html('').append(resp);
                    if (playSound==='on') {
                        ansRevealSound.play();
                    }
                }
            });
            break;
        case 'finished':
            $.ajax({
                url: 'finished.html',
                type: 'GET',
                dataType: 'html',
                async: true,
                error: function () {
                },
                success: function (resp) {
                    $(modalSkeleton).find('#modalShellBody').html('').append(resp);
                }
            });
            break;
        case 'howtoplay':
            $.ajax({
                url: 'howtoplay.html',
                type: 'GET',
                dataType: 'html',
                async: true,
                error: function () {
                },
                success: function (resp) {
                    $(modalSkeleton).find('#modalShellBody').html('').append(resp);
                }
            });
            break;
        case 'reportcard':
            $.ajax({
                url: 'reportcard.html',
                type: 'GET',
                dataType: 'html',
                async: true,
                error: function () {
                },
                success: function (resp) {
                    var totalPlayed=eval(getSetLocalstorage('guec', '', 'get')+getSetLocalstorage('guew', '', 'get'));
                    $(modalSkeleton).find('#modalShellBody').html('').append(resp);
                    $(modalSkeleton).find('.modal-content').find('.spanPlayed').html(totalPlayed);
                    $(modalSkeleton).find('.modal-content').find('.spanCorrectGuess').html(getSetLocalstorage('guec', '', 'get'));
                    $(modalSkeleton).find('.modal-content').find('.spanWrongGuess').html(getSetLocalstorage('guew', '', 'get'));
                }
            });
            break;
        case 'packs':
            $.ajax({
                url: 'packs.html',
                type: 'GET',
                dataType: 'html',
                async: true,
                error: function () {
                },
                success: function (resp) {
                    $(modalSkeleton).find('#modalShellBody').html('').append(resp);
                    $(modalSkeleton).find('.modal-content').find('.tdPageNo').html(getSetLocalstorage('pageno', '', 'get'));

                    // Set no to pack divs
                    var pageNo=getSetLocalstorage('pageno', '', 'get');
                    var startPeak=eval(pageNo-1)*9;
                    var packunlockedtill=getSetLocalstorage('packunlockedtill', '', 'get');

                    for (var i=1; i<=9; i++) {
                        $(modalSkeleton).find('.modal-content').find('.pckDiv'+i+' .clsLvlNo').html(eval(i+startPeak));
                        $(modalSkeleton).find('.modal-content').find('.pckDiv'+i+' .clsLvlNo').attr('packid', eval(i+startPeak));
                        $(modalSkeleton).find('.modal-content').find('.pckDiv'+i+' .clsLvlNo').click(function () {
                            startPack($(this).attr('packid'));
                        });

                        if (eval(i+startPeak)<=packunlockedtill) {
                            $(modalSkeleton).find('.modal-content').find('.pckDiv'+i).addClass('clsPckUnlocked').addClass('unlockColor'+i);
                            if (localStorage.getItem('pack'+(i+startPeak)+'result')!==null&&localStorage.getItem('pack'+(i+startPeak)+'result')!==undefined) {
                                $(modalSkeleton).find('.modal-content').find('.pckDiv'+i).append('<div class="clsPackResult">'+localStorage.getItem('pack'+(i+startPeak)+'result')+'</div>');
                            }
                        }

                        if (eval(i+startPeak)>maxPacks) {
                            $(modalSkeleton).find('.modal-content').find('.pckDiv'+i).addClass('hide');
                        }
                    }

                }
            });
            break;
        case 'packfinish':
            $.ajax({
                url: 'packfinish.html',
                type: 'GET',
                dataType: 'html',
                async: true,
                error: function () {
                },
                success: function (resp) {
                    var packResult='';
                    $(modalSkeleton).find('#modalShellBody').html('').append(resp);
                    $(modalSkeleton).find('.modal-content').find('.infoScore').html(pckCorrectGuess+" / 10");
                    $(modalSkeleton).find('.modal-content').find('.lessGuess').hide();
                    $(modalSkeleton).find('.modal-content').find('.playNextPack').hide();

                    if (pckCorrectGuess<4) {
                        packResult='C';
                        $(modalSkeleton).find('.modal-content').find('.scoreGrade').html("C");
                        $(modalSkeleton).find('.modal-content').find('.lessGuess').show();
                    } else if (pckCorrectGuess<6) {
                        packResult='B';
                        $(modalSkeleton).find('.modal-content').find('.scoreGrade').html("B");
                    } else if (pckCorrectGuess<8) {
                        packResult='A';
                        $(modalSkeleton).find('.modal-content').find('.scoreGrade').html("A");
                    } else if (pckCorrectGuess<10) {
                        packResult='A+';
                        $(modalSkeleton).find('.modal-content').find('.scoreGrade').html("A+");
                    } else if (pckCorrectGuess==10) {
                        packResult='A++';
                        $(modalSkeleton).find('.modal-content').find('.scoreGrade').html("A++");
                    }

                    if (pckCorrectGuess<4) {
                        localStorage.setItem('pack'+pckPlaying+'result', packResult);
                    } else {
                        localStorage.setItem('pack'+eval(pckPlaying-1)+'result', packResult);
                    }

                    if (pckCorrectGuess>3&&pckPlaying<maxPacks) {
                        $(modalSkeleton).find('.modal-content').find('.playNextPack').show();
                    } else if (pckCorrectGuess>3) {
                        $(modalSkeleton).find('.modal-content').find('.reachedEnd').removeClass("hide");
                    }
                    $(modalSkeleton).find('.modal-content').find('.ankNextLvl').text('Play Level '+pckPlaying);
                }
            });
            break;
    }
}