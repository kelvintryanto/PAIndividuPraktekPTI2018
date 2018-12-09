function onDocumentFinish() {
	loadData()
}

function loadData()
{
	var audio = document.getElementById("backgroundAudio")
	audio.play()

	var rawFile = new XMLHttpRequest()
	console.log("Semangat ya qaqa")
	rawFile.open("GET","hero.txt",true);
	rawFile.onreadystatechange = function()
	{
		if(rawFile.readyState === 4)
		{
			if(rawFile.status === 200 || rawFile.status == 0)
			{
				var allText = rawFile.responseText
				var data = JSON.parse(allText)
				localStorage.setItem("data",allText)
				generateHeroTable(data)
			}
		}
	}
	rawFile.send(null);
}

function generateHeroDescription(index){

	let data = JSON.parse(localStorage.getItem("data"))

	if(data === null){
		//jika localStorage kosong maka loadData lagi
		loadData()
		//mengambil ulang json
		data = localStorage.getItem("data")
	}

	//index yang diterima dikurangi 1 karena urutan array dari 0
	let idx = index-1

	//mengubah title dari page seakan-akan berubah page
	document.title = data[idx].name + " | Mobile Legend Encyclopedia"
	
	//mengubah hero description
	let heroDescription = document.getElementById('heroDescription').querySelector('p')
	heroDescription.innerHTML = data[idx].background

	//ubah backgroundDescription
	generateImageBackground(data[idx].backImage)

	//mengubah legend dari fieldset description
	let fieldsetLegend = document.getElementById('heroDescription').querySelector('legend')
	fieldsetLegend.innerHTML = 'Description - ' + data[idx].name

	//mengubah legend dari abilities
	let fielsetAbilities = document.getElementById('heroSkill').querySelector('legend')
	fielsetAbilities.innerHTML = 'Abilities - ' + data[idx].name

	// generate hero skill
	if(index===19){ //jika selena maka gunakan generate hero skill2
		generateHeroSkill2(data[idx].abilities[0])
	}
	else{ //jika lainnya maka gunakan generate hero skill yang pada umumnya
		generateHeroSkill(data[idx].abilities[0])
	}

	//generate voice dari masing-masing hero
	var hero;
	switch (index){
		case 1  : break;
		case 2  : hero = "angelaAudio"; break;
		case 3  : break;
		case 4  : hero = "hildaAudio"; break;
		case 5  : hero = "nanaAudio"; break;
		case 6  : hero = "auroraAudio"; break;
		case 7  : hero = "claudeAudio"; break;
		case 8  : hero = "gusionAudio"; break;
		case 9  : break;
		case 10 : hero = "hylosAudio"; break;
		case 11 : break;
		case 12 : hero = "karinaAudio"; break;
		case 13 : hero = "lesleyAudio"; break;
		case 14 : hero = "minotaurAudio"; break;
		case 15 : hero = "moskovAudio"; break;
		case 16 : hero = "pharsaAudio"; break;
		case 17 : hero = "rafaelaAudio"; break;
		case 18 : hero = "rubyAudio"; break;
		case 19 : hero = "selenaAudio"; break;
		case 20 : hero = "valirAudio"; break;
		case 21 : break;
	}

	// mengambil audio content dari index.html
	var heroAudio = document.getElementById(hero)
	// jika voice hero ada isinya
	if(heroAudio!==null){
		console.log(heroAudio)
		heroAudio.play()
	}
	else {
		console.log("audio Hero is Empty")
	}
	
	
}

function generateImageBackground(data){
	//mengubah heroDescription background
	let heroDescriptionBackground = document.getElementById('heroDescription')
	let bg = "url('" + data + "')"
	heroDescriptionBackground.style.background = bg
	heroDescriptionBackground.style.backgroundAttachment = "fixed"
	heroDescriptionBackground.style.backgroundSize = "100%"
	
}

function generateHeroSkill2(data){
	// cari tbody di id heroAbilities
	let tbody = document.getElementById('heroSkill').querySelector('table')
	tbody.style.width = "100%"
	tbody.innerHTML = ''

	// create row untuk nama skill1 dan 2
	let singleRow1 = document.createElement('tr') //untuk title skill 1
	let singleRow2 = document.createElement('tr') //isi dari skill 1
	let singleRow3 = document.createElement('tr') //untuk title skill 1,2,3 form 1
	let singleRow4 = document.createElement('tr') //isi dari skill 1,2,3 form 1
	let singleRow5 = document.createElement('tr') //untuk title skill 1,2,3 form 2
	let singleRow6 = document.createElement('tr') //isi dari skill 1,2,3 form 2

	let singleRow7 = document.createElement('tr') //untuk title form skill 1
	let singleRow8 = document.createElement('tr') //untuk title form skill 2

	//create multiple column for row 1
	// skill name for form skill
	let colSkill = document.createElement('td')
	colSkill.appendChild(document.createTextNode(data.formskill.name))
	colSkill.colSpan = "6"

	let colSkillForm1 = document.createElement('td')
	colSkillForm1.appendChild(document.createTextNode(data.form1.name))
	colSkillForm1.colSpan = "6"
	colSkillForm1.style.textAlign = "center"

	let colSkillForm2 = document.createElement('td')
	colSkillForm2.appendChild(document.createTextNode(data.form2.name))
	colSkillForm2.colSpan = "6"
	colSkillForm2.style.textAlign = "center"

	//create multiple column for row 3
	// skill name 1 form 1
	let colSkill1Name1 = document.createElement('td')
	colSkill1Name1.appendChild(document.createTextNode(data.form1.skill1.name))
	colSkill1Name1.colSpan = "2"
	colSkill1Name1.style.width = "33.33%"
	
	// skill name 2 form 1
	let colSkill1Name2 = document.createElement('td')
	colSkill1Name2.appendChild(document.createTextNode(data.form1.skill2.name))
	colSkill1Name2.colSpan = "2"
	colSkill1Name2.style.width = "33.33%"
	// END ROW 1

	// skill name 3 form 1
	let colSkill1Name3 = document.createElement('td')
	colSkill1Name3.appendChild(document.createTextNode(data.form1.skill3.name))
	colSkill1Name3.colSpan = "2"
	colSkill1Name3.style.width = "33.33%"
	// END SKILL 1,2,3 FORM 1




	//create multiple column for row 5
	// skill name 1 form 2
	let colSkill2Name1 = document.createElement('td')
	colSkill2Name1.appendChild(document.createTextNode(data.form2.skill1.name))
	colSkill2Name1.colSpan = "2"
	colSkill2Name1.style.width = "33.33%"
	
	// skill name 2 form 2
	let colSkill2Name2 = document.createElement('td')
	colSkill2Name2.appendChild(document.createTextNode(data.form2.skill2.name))
	colSkill2Name2.colSpan = "2"
	colSkill2Name2.style.width = "33.33%"
	// END ROW 1

	// skill name 3 form 3
	let colSkill2Name3 = document.createElement('td')
	colSkill2Name3.appendChild(document.createTextNode(data.form2.skill3.name))
	colSkill2Name3.colSpan = "2"
	colSkill2Name3.style.width = "33.33%"
	// END SKILL 1,2,3 FORM 2



	//create multiple column for row 2
	// gambar skill Form
	let colFormSkill = document.createElement('td')
	colGambar1 = document.createElement('img')
	colGambar1.src = data.formskill.imageURL
	colFormSkill.appendChild(colGambar1)
	colFormSkill.style.textAlign = "center"
	colFormSkill.style.width = "10%"

	//create multiple column for row 4
	// gambar skill Form 1 Skill 1
	let colSkill11 = document.createElement('td')
	colGambar11 = document.createElement('img')
	colGambar11.src = data.form1.skill1.imageURL
	colSkill11.appendChild(colGambar11)
	colSkill11.style.textAlign = "center"
	colSkill11.style.width = "10%"

	// gambar skill Form 1 Skill 2
	let colSkill12 = document.createElement('td')
	colGambar12 = document.createElement('img')
	colGambar12.src = data.form1.skill2.imageURL
	colSkill12.appendChild(colGambar12)
	colSkill12.style.textAlign = "center"
	colSkill12.style.width = "10%"

	// gambar skill Form 1 Skill 3
	let colSkill13 = document.createElement('td')
	colGambar13 = document.createElement('img')
	colGambar13.src = data.form1.skill3.imageURL
	colSkill13.appendChild(colGambar13)
	colSkill13.style.textAlign = "center"
	colSkill13.style.width = "10%"

	//create multiple column for row 5
	// gambar skill Form 2 Skill 1
	let colSkill21 = document.createElement('td')
	colGambar21 = document.createElement('img')
	colGambar21.src = data.form2.skill1.imageURL
	colSkill21.appendChild(colGambar21)
	colSkill21.style.textAlign = "center"
	colSkill21.style.width = "10%"

	// gambar skill Form 2 Skill 2
	let colSkill22 = document.createElement('td')
	colGambar22 = document.createElement('img')
	colGambar22.src = data.form2.skill2.imageURL
	colSkill22.appendChild(colGambar22)
	colSkill22.style.textAlign = "center"
	colSkill22.style.width = "10%"

	// gambar skill Form 2 Skill 3
	let colSkill23 = document.createElement('td')
	colGambar23 = document.createElement('img')
	colGambar23.src = data.form2.skill3.imageURL
	colSkill23.appendChild(colGambar23)
	colSkill23.style.textAlign = "center"
	colSkill23.style.width = "10%"

	
	//create multiple column for row 2
	//deskripsi form
	let colFormDescription = document.createElement('td')
	colFormDescription.appendChild(document.createTextNode(data.formskill.description))
	colFormDescription.colSpan = "5"


	//create multiple column for row 4
	//deskripsi skill form 1 skill 1
	let colDesc11 = document.createElement('td')
	colDesc11.appendChild(document.createTextNode(data.form1.skill1.description))
	colDesc11.style.width = "23.33%"

	//deskripsi skill form 1 skill 2
	let colDesc12 = document.createElement('td')
	colDesc12.appendChild(document.createTextNode(data.form1.skill1.description))
	colDesc12.style.width = "23.33%"

	//deskripsi skill form 1 skill 3
	let colDesc13 = document.createElement('td')
	colDesc13.appendChild(document.createTextNode(data.form1.skill1.description))
	colDesc13.style.width = "23.33%"

	//create multiple column for row 6
	//deskripsi skill form 2 skill 1
	let colDesc21 = document.createElement('td')
	colDesc21.appendChild(document.createTextNode(data.form2.skill1.description))
	colDesc21.style.width = "23.33%"

	//deskripsi skill form 2 skill 2
	let colDesc22 = document.createElement('td')
	colDesc22.appendChild(document.createTextNode(data.form2.skill2.description))
	colDesc22.style.width = "23.33%"

	//deskripsi skill form 2 skill 3
	let colDesc23 = document.createElement('td')
	colDesc23.appendChild(document.createTextNode(data.form2.skill3.description))
	colDesc23.style.width = "23.33%"


	// append child to single row 1
	singleRow1.appendChild(colSkill)

	//append child to single row 2
	singleRow2.appendChild(colFormSkill)
	singleRow2.appendChild(colFormDescription)

	//append child to single row 3
	singleRow3.appendChild(colSkill1Name1)
	singleRow3.appendChild(colSkill1Name2)
	singleRow3.appendChild(colSkill1Name3)

	//append child to single row 4
	singleRow4.appendChild(colSkill11)
	singleRow4.appendChild(colDesc11)
	singleRow4.appendChild(colSkill12)
	singleRow4.appendChild(colDesc12)
	singleRow4.appendChild(colSkill13)
	singleRow4.appendChild(colDesc13)

	//append child to single row 5
	singleRow5.appendChild(colSkill2Name1)
	singleRow5.appendChild(colSkill2Name2)
	singleRow5.appendChild(colSkill2Name3)

	//append child to single row 6
	singleRow6.appendChild(colSkill21)
	singleRow6.appendChild(colDesc21)
	singleRow6.appendChild(colSkill22)
	singleRow6.appendChild(colDesc22)
	singleRow6.appendChild(colSkill23)
	singleRow6.appendChild(colDesc23)

	//append child to single row 7 & 8
	singleRow7.appendChild(colSkillForm1)
	singleRow8.appendChild(colSkillForm2)


	// styling singleRow1
	singleRow1.style.textAlign = "center"
	singleRow1.style.backgroundColor = "#000"
	singleRow1.style.color = "#FFF"

	// styling singleRow3
	singleRow3.style.textAlign = "center"
	singleRow3.style.backgroundColor = "#000"
	singleRow3.style.color = "#FFF"

	// styling singleRow5
	singleRow5.style.textAlign = "center"
	singleRow5.style.backgroundColor = "#000"
	singleRow5.style.color = "#FFF"

	//styling singleRow7 & singleRow8
	singleRow7.style.backgroundColor = "#000"
	singleRow7.style.color = "#FFF"
	singleRow8.style.backgroundColor = "#000"
	singleRow8.style.color = "#FFF"

	tbody.appendChild(singleRow1)
	tbody.appendChild(singleRow2)
	tbody.appendChild(singleRow7)
	tbody.appendChild(singleRow3)
	tbody.appendChild(singleRow4)
	tbody.appendChild(singleRow8)
	tbody.appendChild(singleRow5)
	tbody.appendChild(singleRow6)
}

function generateHeroSkill(data){

	// cari tbody di id heroAbilities
	let tbody = document.getElementById('heroSkill').querySelector('table')
	tbody.style.width = "100%"
	tbody.innerHTML = ''

	// create row untuk nama skill1 dan 2
	let singleRow1 = document.createElement('tr')
	let singleRow2 = document.createElement('tr')
	let singleRow3 = document.createElement('tr')	
	let singleRow4 = document.createElement('tr')

	//create multiple column for row 1
	// skill name 1
	let colSkillName1 = document.createElement('td')
	colSkillName1.appendChild(document.createTextNode(data.skill1.name))
	colSkillName1.colSpan = "2"
	colSkillName1.style.width = "50%"
	
	// skill name 2
	let colSkillName2 = document.createElement('td')
	colSkillName2.appendChild(document.createTextNode(data.skill2.name))
	colSkillName2.colSpan = "2"
	colSkillName2.style.width = "50%"
	// END ROW 1

	// create multiple column for row 3
	// skill name 3
	let colSkillName3 = document.createElement('td')
	colSkillName3.appendChild(document.createTextNode(data.skill3.name))
	colSkillName3.colSpan = "2"
	colSkillName3.style.width = "50%"

	// skill name 4
	let colSkillName4 = document.createElement('td')
	colSkillName4.appendChild(document.createTextNode(data.skill4.name))
	colSkillName4.colSpan = "2"
	colSkillName4.style.width = "50%"
	// END ROW 3



	//create multiple colum for row 2
	// gambar skill 1
	let colImage1 = document.createElement('td')
	colGambar1 = document.createElement('img')
	colGambar1.src = data.skill1.imageURL
	colImage1.appendChild(colGambar1)
	colImage1.style.width = "10%"

	// gambar skill 2
	let colImage2 = document.createElement('td')
	colGambar2 = document.createElement('img')
	colGambar2.src = data.skill2.imageURL
	colImage2.appendChild(colGambar2)
	colImage2.style.width = "10%"
	// END MULTIPLE COLUMN FOR ROW 4

	//create multiple colum for row 4
	// gambar skill 3
	let colImage3 = document.createElement('td')
	colGambar3 = document.createElement('img')
	colGambar3.src = data.skill3.imageURL
	colImage3.appendChild(colGambar3)
	colImage3.style.width = "10%"

	// gambar skill 4
	let colImage4 = document.createElement('td')
	colGambar4 = document.createElement('img')
	colGambar4.src = data.skill4.imageURL
	colImage4.appendChild(colGambar4)
	colImage4.style.width = "10%"
	// END MULTIPLE COLUMN FOR ROW 4


	//create multiple colum for row 2 & 4
	// deskripsi skill1
	let colDescription1 = document.createElement('td')
	colDescription1.appendChild(document.createTextNode(data.skill1.description))
	colDescription1.style.width = "40%"

	// deskripsi skill2
	let colDescription2 = document.createElement('td')
	colDescription2.appendChild(document.createTextNode(data.skill2.description))
	colDescription2.style.width = "40%"
	// END ROW 2
	
	//create multiple colum for row 4
	let colDescription3 = document.createElement('td')
	colDescription3.appendChild(document.createTextNode(data.skill3.description))
	colDescription3.style.width = "40%"

	let colDescription4 = document.createElement('td')
	colDescription4.appendChild(document.createTextNode(data.skill4.description))
	colDescription4.style.width = "40%"
	// END ROW 4



	// append all content for singleRow1
	singleRow1.appendChild(colSkillName1)
	singleRow1.appendChild(colSkillName2)

	// append all content for singleRow2
	singleRow2.appendChild(colImage1)
	singleRow2.appendChild(colDescription1)
	singleRow2.appendChild(colImage2)
	singleRow2.appendChild(colDescription2)

	// append all content for singleRow3
	singleRow3.appendChild(colSkillName3)
	singleRow3.appendChild(colSkillName4)

	// append all content for singleRow4
	singleRow4.appendChild(colImage3)
	singleRow4.appendChild(colDescription3)
	singleRow4.appendChild(colImage4)
	singleRow4.appendChild(colDescription4)

	// styling title of skill single Row 1
	singleRow1.style.textAlign = "center"
	singleRow1.style.backgroundColor = "#000"
	singleRow1.style.color = "#FFF"

	// styling title of skill single Row 3
	singleRow3.style.textAlign = "center"	
	singleRow3.style.backgroundColor = "#000"	
	singleRow3.style.color = "#FFF"


	// append row to tbody
	tbody.appendChild(singleRow1)
	tbody.appendChild(singleRow2)
	tbody.appendChild(singleRow3)
	tbody.appendChild(singleRow4)
}



function generateHeroTable(data){
	let tbody = document.getElementById('heroTable').querySelector('tbody')

	//load hero data
	for(idx=0; idx < data.length; idx++){
		//create row
		let singleRow = document.createElement('tr')

		//create column
		let colID = document.createElement('td')
		colID.appendChild(document.createTextNode(data[idx].id))
		let colImage = document.createElement('td')
		let colGambar = document.createElement('img')
		colGambar.src = data[idx].imageURL
		colImage.appendChild(colGambar)
		let colName = document.createElement('td')
		colName.appendChild(document.createTextNode(data[idx].name))
		let colAlias = document.createElement('td')
		colAlias.appendChild(document.createTextNode(data[idx].alias))
		let colRole = document.createElement('td')
		colRole.appendChild(document.createTextNode(data[idx].role))
		let colSpecialty = document.createElement('td')
		colSpecialty.appendChild(document.createTextNode(data[idx].specialty))
		let colBackground = document.createElement('td')
		colBackground.appendChild(document.createTextNode(data[idx].background))

		let abil = data[idx].abilities

		//cek apakah ada komponen tersebut atau tidak
		//belum dikerjakan, hal ini menimbulkan id 19 dst tidak bisa muncul

		let colSkill1Name = document.createElement('td')
		colSkill1Name.appendChild(document.createTextNode(abil[0].skill1.name))
		let colSkill2Name = document.createElement('td')
		colSkill2Name.appendChild(document.createTextNode(abil[0].skill2.name))
		let colSkill3Name = document.createElement('td')
		colSkill3Name.appendChild(document.createTextNode(abil[0].skill3.name))
		let colSkill4Name = document.createElement('td')
		colSkill4Name.appendChild(document.createTextNode(abil[0].skill4.name))


		//menambahkan column ke row
		singleRow.appendChild(colID)
		singleRow.appendChild(colImage)
		singleRow.appendChild(colName)
		singleRow.appendChild(colAlias)
		singleRow.appendChild(colRole)
		singleRow.appendChild(colSpecialty)
		singleRow.appendChild(colBackground)
		singleRow.appendChild(colSkill1Name)
		singleRow.appendChild(colSkill2Name)
		singleRow.appendChild(colSkill3Name)
		singleRow.appendChild(colSkill4Name)


		tbody.appendChild(singleRow)

	}
}