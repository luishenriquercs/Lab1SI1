angular.module("SistemaDeMusica").controller("appController", function($scope) {
	$scope.artistas = [];
	$scope.playlists = [];
	$scope.musicas = [];

	$scope.adicionaArtista = function(artista) {
		if(procuraArtista(artista.nome) != null) {
			alert("Artista já cadastrado no sistema.");	                                                                                                                                              
		}
		else {
			$scope.artista.nota = "";
			$scope.artista.albuns = [];
			$scope.artista.favorito = false;
			$scope.artistas.push(angular.copy(artista));
			delete $scope.artista;
		}
	};

	procuraArtista = function(nome) {
		var achou = null;
		for (var i = $scope.artistas.length - 1; i >= 0; i--) {
			if($scope.artistas[i].nome == nome) {
				achou = $scope.artistas[i];
			}
		}
		return achou;
	};
	
	$scope.adicionaMusica = function(musica) {
		if(procuraAlbum(musica.artista, musica.album) == null) {
			var album = {};
			album.nomeAlbum = musica.album;
			album.musicas = [];
			album.musicas.push(angular.copy(musica));
			$scope.musicas.push(musica);
			var artista = procuraArtista(musica.artista);
			artista.albuns.push(album);
			delete $scope.musica;
			alert("Música adicionada com sucesso.");
		}
		else {
			if(verificaMusica(musica.artista, musica.album, musica.nome) != null) {
				alert("Música já existente no álbum");
			}
			else {
				adicionaMusicaAlbum(musica);
				alert("Música adicionada com sucesso.");
			}
		}
	}

	procuraAlbum = function(nomeArtista, nomeAlbum) {
		var artista = procuraArtista(nomeArtista);
		var achou = null;
		for (var i = artista.albuns.length - 1; i >= 0; i--) {
			if(artista.albuns[i].nomeAlbum === nomeAlbum) {
				achou = artista.albuns[i];
			}
		}
		return achou;
	}

	verificaMusica = function(nomeArtista, nomeAlbum, nomeMusica) {
		var artista = procuraArtista(nomeArtista);
		var achou = null;
		for (var i = artista.albuns.length - 1; i >= 0; i--) {
			if(artista.albuns[i].nomeAlbum === nomeAlbum) {
				for (var j = artista.albuns[i].musicas.length - 1; j >= 0; j--) {
					if(artista.albuns[i].musicas[j].nome === nomeMusica) {
						achou = artista.albuns[i].musicas[j];
					}
				}
			}
		}
		return achou;
	}

	verificaMusicaNome = function(nomeMusica) {
		var achou = null;
		for (var i = $scope.musicas.length - 1; i >= 0; i--) {
			if($scope.musicas[i].nome == nomeMusica) {
				achou = $scope.musicas[i];
			}
		}
		return achou;
	}

	adicionaMusicaAlbum = function(musica) {
		var artista = procuraArtista(musica.artista);
		for (var i = artista.albuns.length - 1; i >= 0; i--) {
			if(artista.albuns[i].nomeAlbum === musica.album) {
				artista.albuns[i].musicas.push(angular.copy(musica));
				$scope.musicas.push(musica);
				delete $scope.musica;
			}
		}
	}

	$scope.adicionaFavoritos = function(artista) {
		for (var i = $scope.artistas.length - 1; i >= 0; i--) {
			if($scope.artistas[i].nome === artista.nome) {
				if($scope.artistas[i].favorito == true) {
					$scope.artistas[i].favorito = false;
					alert("Artista removido dos favoritos com sucesso.");
				}
				else {
					$scope.artistas[i].favorito = true;
					alert("Artista adicionado aos favoritos com sucesso.");
				}
				return;
			}
		}
	}

	$scope.adicionaNota = function(artista) {
		var artistaPesquisado = procuraArtista(artista.nome);
		artistaPesquisado.nota = artista.nota;
		delete $scope.artistaPesquisado;
	}

	verificaPlayList = function(nomePlayList) {
		var playlist = null;
		for (var i = $scope.playlists.length - 1; i >= 0; i--) {
			if($scope.playlists[i].nome == nomePlayList) {
				playlist = $scope.playlists[i];
			}
		}
		return playlist;

	}

	$scope.adicionaPlayList = function(playlist, nomeMusica) {
		var minhaPlayList = verificaPlayList(playlist.nome);
		var minhaMusica = verificaMusicaNome(nomeMusica);

		if(minhaMusica == null) {
			alert("Música não cadastrada.")
		}
		else {
			if(minhaPlayList != null) {
				if (verificaMusicaPlayList(playlist.nome, nomeMusica) == true) {
					alert("Música já existente na playlist");
				}
				else {
					minhaPlayList.musicas.push(minhaMusica);
				}
			}
			else {
				playlist.musicas = [];
				playlist.musicas.push(minhaMusica);
				$scope.playlists.push(angular.copy(playlist));
				delete $scope.playlist;
			}
		}
	}

	verificaMusicaPlayList = function(nomePlayList, nomeMusica) {
		var achou = false;
		for (var i = $scope.playlists.length - 1; i >= 0; i--) {
				if($scope.playlists[i].nome == nomePlayList) {
					for (var j = $scope.playlists[i].musicas.length - 1; j >= 0; j--) {
						if($scope.playlists[i].musicas[j].nome == nomeMusica) {
							achou = true;
						}
					}

				}
			}
			return achou;
	}








})