var SrcTecMenuTimePra = 0;
var SrcTecMenuAnimStep = 0;
var SrcTecMenuNSCW = 0;
var SrcTecMenuNSCH = 0;
var SrcTecMenutempCW=0
var SrcTecMenutempCH=0
var SrcTecMenutempObj=null
var SrcTecMenuoldimg=""
var SrcTecMenumenuCo=0
var SrcTecMenuoldHTML=""
var SrcTecMenucount=0 
var SrcTecMenuFadeStepArray = new Array();
var oldParent=""



SrcTecMenuLoader = (SrcTecMenuInFrames) ? (SrcTecMenuNS) ? parent : parent.document.body : window;

SrcTecMenuLoader.onload = SrcTecMenuBegin;

if(SrcTecMenuNS){
	SrcTecMenuOrigWidth = SrcTecMenuLoader.innerWidth;
	SrcTecMenuOrigHeight = SrcTecMenuLoader.innerHeight;
	SrcTecMenuLoader.onresize = SrcTecMenuRpeate;
}

SrcTecMenuIsLoaded = false;
SrcTecMenuNSresized = false;

if (!window.SrcTecMenumenuVersion) 
{

	SrcTecMenuClickHide =false;
	SrcTecMenuShowProPerties =false;
	SrcTecNsIsFontOver =false;
	SrcTecMenuKeeHiLi =false;
	SrcTecMenuIsClickStart =false;
}


SrcTecMenuIsWin = (navigator.appVersion.indexOf("Win") != -1)
if (!SrcTecMenuIsWin && !SrcTecMenuisMac) SrcTecNsIsFontOver = SrcTecMenuShowProPerties = false;
SrcTecMenuInnerTimer = SrcTecMenusecondsVisible*1000;
SrcTecMenuIsRight = (window.SrcTecMenuNSFrameLog && SrcTecMenuNSFrameLog == "right");
SrcTecMenuIsCreated = false;
SrcTecMenuLoc = null;

// initialize the global variants
SrcTecMenuInit();

function SrcTecMenuInit() {
	if(SrcTecMenuIsCreated) {
		for(i=1; i<SrcTecMenuTopCount; i++) {
			objel = eval("MenuId"+i);
			clearTimeout(objel.SrcTecMenuHideTimer);
			objel.SrcTecMenuHideTimer=null;
		}
		clearTimeout(SrcTecMenuAllTimer);
	}
	SrcTecMenuTopCount = 1;
	SrcTecMenuIsCreated = false;
	SrcTecMenuBeCreated = false;
	SrcTecMenuIsOverMenu = false;
	SrcTecMenuCurrent = null;
	SrcTecMenuAllTimer = null;
}


function SrcTecMenuBegin() {
	SrcTecMenuIsLoaded = true;	
	SrcTecMenuLoc = window;
	SrcTecMenuLoc.nav = nav = window;
	if (SrcTecMenuClickHide) {
		if (SrcTecMenuNS) SrcTecMenuLoc.document.captureEvents(Event.MOUSEDOWN);
		SrcTecMenuLoc.document.onmousedown = SrcTecMenuClick;
	}
	SrcTecMenuSetMenu();	
}


//create the menu tree
function SrcTecMenuSetMenu(){
	SrcTecMenuBeCreated = true;
	if(SrcTecMenuIE) {
		topZ = 0;
		for (z=0;z<SrcTecMenuLoc.document.all.length;z++){
			oldEl = SrcTecMenuLoc.document.all(z);
			topZ = Math.max(oldEl.style.zIndex,topZ)
		}
	}
	while(eval("window.SrcTecMenu" + SrcTecMenuTopCount)) {
		(SrcTecMenuNS) ? SrcTecMenuGen(true,false,SrcTecMenuTopCount) : SrcTecMenuGen(false,false,SrcTecMenuTopCount);
		SrcTecMenuTopCount++
	}

	
	SrcTecMenuIsCreated = true;
	SrcTecMenuBeCreated = false;
}



function SrcTecMenuGen(isNs,isChild,menuCount,parentEl,parentItemEl) {

	if (isNs)
	{
	    GenArray = eval("SrcTecMenu" + menuCount);
	
	if (!isChild) {
		GenWidth =  GenArray[0] 
		MenuRect = SrcTecMenuSetMenuBlock("MenuId" + menuCount,GenWidth,null,null);
	}
	else {
		MenuRect = SrcTecMenuSetMenuBlock("MenuId" + menuCount,null,parentEl,null);
		
	}
	
	
	MenuRect.tagName="layer"
	
	MenuRect.MenuArray =  GenArray;
	MenuRect.SrcTecMenuSetMenuProperties = SrcTecMenuSetMenuProperties;
	MenuRect.SrcTecMenuSetMenuProperties(isChild,parentEl);
	SrcTecMenumenuCo=menuCount
	
	while (MenuRect.ItemCount < MenuRect.MaxItems) {
		MenuRect.ItemCount++;
		PreItem = (MenuRect.ItemCount > 1) ? MenuRect.Item : null;
		ItemId = "Item" + menuCount + "_" + MenuRect.ItemCount;
		
		MenuRect.Item = SrcTecMenuSetMenuBlock(ItemId,null,null,MenuRect);

		MenuRect.Item.PreItem = PreItem;
		MenuRect.Item.Setup = SrcTecMenuSetMenuItem;
		MenuRect.Item.Setup(MenuRect.ItemCount,MenuRect.MenuArray);
		if (MenuRect.Item.HasMore) {
			SrcTecMenuGen(true,true,menuCount + "_" + MenuRect.ItemCount,MenuRect,MenuRect.Item);
			MenuRect = MenuRect.ParentMenu;
		}
	}

	MenuRect.NextItem = MenuRect.Item;
	MenuRect.Setup(isChild,parentEl,parentItemEl);
	}
	else
	{
	  arrayFont=eval("SrcTecMenuFontStyle" + menuCount);
	arrayLay=eval("SrcTecMenuLayStyle" + menuCount);
	MenuRect = SrcTecMenuSetMenuBlock("MenuId" + menuCount);
	MenuRect.MenuArray = eval("SrcTecMenu" + menuCount);

	MenuRect.SrcTecMenuSetMenuProperties = SrcTecMenuSetMenuProperties;
	MenuRect.SrcTecMenuSetMenuProperties(isChild,parentEl);

	MenuRect.ItemText = "";
	
	while (MenuRect.ItemCount < MenuRect.MaxItems) {
		MenuRect.ItemCount++;
		
		ItemId = "Item" + menuCount + "_" + MenuRect.ItemCount;

		ArrayPt = (isChild) ? (MenuRect.ItemCount-1)*3 :((MenuRect.ItemCount-1)*3)+9;
		DispText = MenuRect.MenuArray[ArrayPt];
		HasMore = MenuRect.MenuArray[ArrayPt + 2];
		
		HtmText =  DispText

		MenuRect.ItemText += "<SPAN ID=" + ItemId + " STYLE=\"width:" + (MenuRect.selfWidth-(arrayLay[0]*2)) + "\">" + HtmText + "</SPAN><BR>";

		if (HasMore) {
			SrcTecMenuGen(false,true,menuCount + "_" + MenuRect.ItemCount,MenuRect);
			MenuRect = MenuRect.ParentMenu;
		}	
	}

	MenuRect.innerHTML = MenuRect.ItemText;
	ItemColl = MenuRect.children.tags("SPAN");
	for (i=0; i<ItemColl.length; i++) {
		it = ItemColl(i);
		it.Setup = SrcTecMenuSetMenuItem;
		it.Setup(i+1,MenuRect.MenuArray);
	}
	MenuRect.NextItem = ItemColl(ItemColl.length-1);
	MenuRect.Setup(isChild,parentEl);
	}
	
}



function SrcTecMenuTreePro(element){
	ProveTree = false;
	for(i=11;i<element.MenuArray.length;i+=3){
		if(element.MenuArray[i]) {
			ProveTree = true;
			break;
		}
	}

	return ProveTree;
}


// create the menu properties list.
function SrcTecMenuSetMenuProperties(isChild,parentEl) {
	if (!isChild) {
		SrcTecMenucount=SrcTecMenucount+1
		if (SrcTecMenuIE)
		{
		arrayFont=eval("SrcTecMenuFontStyle"+this.id.substring(6))
		arrayLay=eval("SrcTecMenuLayStyle"+this.id.substring(6))
		}
		else
		{
		arrayFont=eval("SrcTecMenuFontStyle"+SrcTecMenucount)
		arrayLay=eval("SrcTecMenuLayStyle"+SrcTecMenucount)
		}
		this.selfWidth = this.MenuArray[0];
		this.selfLeft = this.MenuArray[1];
		this.selfTop = this.MenuArray[2];
		this.selfFontColor = arrayFont[1];
		this.selfFontOver = arrayFont[7];
		this.selfBGColor = arrayFont[5] ;
		this.selfBGOver =  arrayFont[11] ;
		this.selfFontFam=arrayFont[0];
		this.selfFontWei=arrayFont[3];
		this.selfFontSty=arrayFont[4];
		this.selfFontSize=arrayFont[2]+"pt"
		this.selfFontFamOver=arrayFont[6] ? arrayFont[6] :arrayFont[0];
		this.selfFontWeiOver=arrayFont[9]?arrayFont[9] :arrayFont[3];
		this.selfFontStyOver=arrayFont[10]?arrayFont[10] :arrayFont[4];
		this.selfFontSizeOver=arrayFont[8]+"pt";
		
		this.selfBorderColor = arrayLay[1] ? arrayLay[1] : borCol;
		
		this.selfItemBorderColor = arrayLay[5] ;
		this.selfItemBorder= arrayLay[4]
		
		this.selfItemBorderSty= arrayLay[6]?arrayLay[6] : separatorsty;
		
		this.selfItemBorderTopCol=arrayLay[8]
		this.selfItemBorderTop=arrayLay[7]
		this.selfItemBorderTopSty=arrayLay[9]
		
		this.selfItemBorderLeftCol=arrayLay[11]
		this.selfItemBorderLeft=arrayLay[10]
		this.selfItemBorderLeftSty=arrayLay[12]
		
		this.selfItemBorderRightCol=arrayLay[14]
		this.selfItemBorderRight=arrayLay[13]
		this.selfItemBorderRightSty=arrayLay[15]
		
		this.selfBoderWid=arrayLay[0]
		this.selfMenuParent = this;
		this.selfChildFirst = this;


		this.selfTreePre = SrcTecMenuTreePro(this);
	}
	else {
		this.selfWidth = parentEl.selfWidth;
		this.selfLeft = parentEl.selfLeft;
		this.selfTop = parentEl.selfTop;
		this.selfFontColor = parentEl.selfFontColor;
		this.selfFontOver = parentEl.selfFontOver;
		
		this.selfBGColor = parentEl.selfBGColor;
		
		this.selfBGOver = parentEl.selfBGOver;
		this.selfBorderColor = parentEl.selfBorderColor;
		this.selfItemBorderColor = parentEl.selfItemBorderColor;
		
		this.selfItemBorder=parentEl.selfItemBorder
		this.selfItemBorderSty=parentEl.selfItemBorderSty
		
		
		this.selfItemBorderTopCol=parentEl.selfItemBorderTopCol
		this.selfItemBorderTop=parentEl.selfItemBorderTop
		this.selfItemBorderTopSty=parentEl.selfItemBorderTopSty
		
		this.selfItemBorderLeftCol=parentEl.selfItemBorderLeftCol
		this.selfItemBorderLeft=parentEl.selfItemBorderLeft
		this.selfItemBorderLeftSty=parentEl.selfItemBorderLeftSty
		
		this.selfItemBorderRightCol=parentEl.selfItemBorderRightCol
		this.selfItemBorderRight=parentEl.selfItemBorderRight
		this.selfItemBorderRightSty=parentEl.selfItemBorderRighSty
		
		this.selfMenuParent = parentEl.selfMenuParent;
		this.selfFontFamOver=parentEl.selfFontFamOver
		this.selfFontWeiOver=parentEl.selfFontWeiOver
		this.selfFontStyOver=parentEl.selfFontStyOver
		this.selfFontSizeOver=parentEl.selfFontSizeOver
		this.selfFontSize=parentEl.selfFontSize

		this.selfTreePre = parentEl.selfTreePre;
	}

	this.MaxItems = (isChild) ? this.MenuArray.length/3 : (this.MenuArray.length-9)/3;
	this.selfParent = isChild;
    	this.Setup = SrcTecMenuSetMenuMore;
	this.ItemCount = 0;
}



//set menu block html tag
function SrcTecMenuSetMenuBlock(ElPara,WidthPara,ParentPara,CreatorPara) {
        if (ElPara.indexOf("MenuId")!=-1)
        {
          arrayFont=eval("SrcTecMenuFontStyle"+ElPara.substring(6))
          arrayLay=eval("SrcTecMenuLayStyle"+ElPara.substring(6))
        }
        
	if (SrcTecMenuNS) {
		if (WidthPara) {
			ItemElWidth = WidthPara;
		}
		else {
			ItemElWidth = (CreatorPara) ? CreatorPara.selfWidth : ParentPara.selfWidth;
			if (CreatorPara) ItemElWidth = ItemElWidth-(arrayLay[0]*2)-(arrayLay[3]*2);
		}
		if (!CreatorPara) CreatorPara = SrcTecMenuLoc;
		tempLarObj=eval(ElPara + "= new Layer(ItemElWidth,CreatorPara)");
		
	}
	else {
		menuTempStr = "<DIV ID=" + ElPara + " STYLE='position:absolute'></DIV>";
		SrcTecMenuLoc.document.body.insertAdjacentHTML("BeforeEnd",menuTempStr);
	}
	return eval(ElPara);
}


function SrcTecMenuSetMenuLink() {
	if (this.LinkUrl.indexOf("javascript:")!=-1) eval(this.LinkUrl)
	else SrcTecMenuLoc.open(this.LinkUrl, this.ItemTarget) ;
	
	
}

// set item positon and style
function SrcTecMenuSetMenuItem(whichItem,whichArray) {

	this.onmouseover = SrcTecMenuSetItemOver;
	this.onmouseout = SrcTecMenuSetItemOut;
	if (SrcTecMenuIE)
	{
	arrayFont=eval("SrcTecMenuFontStyle"+this.id.substring(4,5))
	arrayLay=eval("SrcTecMenuLayStyle"+this.id.substring(4,5))
	arrayImgSize=eval("SrcTecMenuImgSize"+this.id.substring(4,5))
	arrayTarget=eval("SrcTecMenuTarget"+this.id.substring(4,5))
	}
	else
	{
	arrayFont=eval("SrcTecMenuFontStyle"+SrcTecMenumenuCo)
	arrayLay=eval("SrcTecMenuLayStyle"+SrcTecMenumenuCo)
	arrayImgSize=eval("SrcTecMenuImgSize"+SrcTecMenumenuCo)
	arrayTarget=eval("SrcTecMenuTarget"+SrcTecMenumenuCo)
	}
	
	this.Creator = (SrcTecMenuNS) ? this.parentLayer : this.offsetParent;
	

	
	ArrayPt = (this.Creator.selfParent) ? (whichItem-1)*3 : ((whichItem-1)*3)+9;

	this.DispText = whichArray[ArrayPt];
	this.LinkUrl = whichArray[ArrayPt + 1];
	this.HasMore = whichArray[ArrayPt + 2];

	if (SrcTecMenuIE && this.HasMore) {
		this.child = eval("MenuId" + this.id.substr(4));
		this.child.ParentMenu = this.Creator;
		this.child.PreviewItem = this;
	}

	if (this.LinkUrl) {
	
		if (SrcTecMenuNS) {
			this.captureEvents(Event.MOUSEUP)
			this.onmouseup = SrcTecMenuSetMenuLink;
			this.ItemTarget=arrayTarget[whichItem-1];
		}
		else {
			this.onclick = SrcTecMenuSetMenuLink;
			this.ItemTarget=arrayTarget[whichItem-1];
			this.style.cursor = "hand";
		}
	}

	if (SrcTecMenuNS) {
		HtmText = this.DispText;
		
		n=HtmText.indexOf("<img")
		if (n!=-1)
		{
			m=HtmText.indexOf(">",n)
			strTemp1=HtmText.substring(0,n)
			strTemp2=HtmText.substring(n+1,m)
			strTemp3=HtmText.substring(m+1,HtmText.length)
			strTemp2="<"+strTemp2+">"
			HtmText1=strTemp1+strTemp3
			
		}
		else
		{
			HtmText1=strTemp1=strTemp2=strTemp3=""
		}
		
		
		
		n=HtmText.indexOf("<img")
		if (n!=-1)
		{
			x=HtmText1.indexOf("<div")
			y=HtmText1.indexOf(">",x)
			z=HtmText1.indexOf("</div>")
			HpText1=HtmText1.substring(0,y+1)
			HpText2=HtmText1.substring(y+1,z)
			HpText3=HtmText1.substring(z,HtmText.length)
			
			
		}
		else
		{
			x=HtmText.indexOf("<div")
			y=HtmText.indexOf(">",x)
			z=HtmText.indexOf("</div>")
			HpText1=HtmText.substring(0,y+1)
			HpText2=HtmText.substring(y+1,z)
			HpText3=HtmText.substring(z,HtmText.length)
		}
		
		
		if (HtmText1!=""){
		if (arrayFont[3]=="bold") HtmText1 = HtmText1.bold();
		if (arrayFont[4]=="italic") HtmText1 = HtmText1.italics();
		}
		else
		{
		if (arrayFont[3]=="bold") HtmText = HtmText.bold();
		if (arrayFont[4]=="italic") HtmText = HtmText.italics();
		}
		
		//if (HtmText1!="")
		HtmTextTemp= "<FONT FACE='" +  arrayFont[0] + "' POINT-SIZE=" + arrayFont[2] + ">" + HpText2+ "</FONT>";
		//else
		//HtmTextTemp= "<FONT FACE='" +  arrayFont[0] + "' POINT-SIZE=" + arrayFont[2] + ">" + HtmText+ "</FONT>";
		
		
		
		//if (HtmText1!="")
		HtmTextTemp1= "<FONT FACE='" +  arrayFont[6] + "' POINT-SIZE=" + arrayFont[8] + ">" + HpText2+ "</FONT>";
		//else
		//HtmTextTemp1= "<FONT FACE='" +  arrayFont[6] + "' POINT-SIZE=" + arrayFont[8] + ">" + HtmText+ "</FONT>";
		
		if (HtmText1!="")
		HtmText=HpText1+strTemp2+HtmTextTemp+HpText3
		else
		HtmText=HpText1+HtmTextTemp+HpText3
		
		//alert(HtmText)

		//if (strTemp2!="")
		//{
		this.HtmTextOver = HtmTextTemp1.fontcolor(this.Creator.selfFontOver);
		//}
		//else
		//{
		//this.HtmTextOver = (strTemp2+HtmTextTemp1).fontcolor(this.Creator.selfFontOver);
		//}
		
		this.HtmText = HtmText.fontcolor(this.Creator.selfFontColor);

		//alert(this.HtmText)
		tempElementText= eval("SrcTecMenuImg" + SrcTecMenumenuCo);
		
		if (tempElementText[whichItem-1]!="")
		this.HtmTextOver = HpText1+tempElementText[whichItem-1] + this.HtmTextOver +HpText3
		else
		this.HtmTextOver = HpText1+strTemp2 + this.HtmTextOver +HpText3
		
		//alert(this.HtmTextOver)
		

		this.visibility = "inherit";
		this.bgColor = this.Creator.selfBGColor;

		if (whichItem == 1) {
			this.top = arrayLay[0] + arrayLay[3]+arrayLay[7];
		}
		else {
			this.top = this.PreItem.top + this.PreItem.clip.height + arrayLay[4];
		}
		this.left = arrayLay[0] + arrayLay[3]+arrayLay[10]+arrayLay[13];
		this.clip.top = this.clip.left = -arrayLay[3];
		this.clip.right = this.Creator.selfWidth-(arrayLay[0]*2)-arrayLay[3]-arrayLay[10]


		ItemTxtWidth = this.Creator.selfWidth-(arrayLay[0]*2)-(arrayLay[3]*2)-arrayLay[10]-arrayLay[13]
		
		if (this.Creator.selfTreePre) ItemTxtWidth-=(arrayImgSize[whichItem-1]); 

		this.LayerText = new Layer(ItemTxtWidth,this);


		if (SrcTecMenuIsRight && this.Creator.selfTreePre) this.LayerText.left = arrayImgSize[whichItem-1];
		

		this.LayerText.document.write(this.HtmText);
		this.LayerText.document.close();
		this.LayerText.visibility = "inherit";


		this.clip.bottom = this.LayerText.document.height+arrayLay[3]+arrayLay[4]+arrayLay[7];

		this.LayerWhole = new Layer(100,this);
		this.LayerWhole.left = this.LayerWhole.top = -arrayLay[3];
		this.LayerWhole.clip.width = this.clip.width;
		this.LayerWhole.clip.height = this.clip.height;
		this.LayerWhole.visibility = "inherit";
	}
	else {
		with (this.style) {
			padding = arrayLay[3];


			if (this.Creator.selfTreePre && !this.HasMore) {
				if (SrcTecMenuIsRight) paddingLeft = arrayLay[3]+arrayImgSize[whichItem-1];
				else paddingRight = arrayLay[3]+arrayImgSize[whichItem-1];
			}
			color = this.Creator.selfFontColor;
			
			fontSize = arrayFont[2] + "pt";
			fontWeight = arrayFont[3]
			fontStyle = arrayFont[4]
			fontFamily =  arrayFont[0] ;
			
			borderBottomWidth = this.Creator.selfItemBorder + "px";
			borderBottomColor = this.Creator.selfItemBorderColor;
			borderBottomStyle = this.Creator.selfItemBorderSty
			
			borderTopStyle=this.Creator.selfItemBorderTopSty
			borderTopColor=this.Creator.selfItemBorderTopCol
			borderTopWidth=this.Creator.selfItemBorderTop+ "px";
			
			borderLeftStyle=this.Creator.selfItemBorderLeftSty
			borderLeftColor=this.Creator.selfItemBorderLeftCol
			borderLeftWidth=this.Creator.selfItemBorderLeft+ "px";
			
			borderRightStyle=this.Creator.selfItemBorderRightSty
			borderRightColor=this.Creator.selfItemBorderRight
			borderRightWidth=this.Creator.selfItemBorderRight+ "px";
			
			
			
			backgroundColor = this.Creator.selfBGColor;
		}
	}
}	
  
  
// set menu block visible property.
function SrcTecMenuSetMenuMore(hasParent,openCont,openItem) {
	this.onmouseover = SrcTecMenuSetMenuOver;
	this.onmouseout = SrcTecMenuSetMenuOut;
	
	arrayFont=eval("SrcTecMenuFontStyle"+SrcTecMenucount)
	arrayLay=eval("SrcTecMenuLayStyle"+SrcTecMenucount)
	
	

	this.SrcTecMenuShowMenu = SrcTecMenuShowMenu;
	this.MenuKeepIn = SrcTecMenuKeepIn;
	this.SrcTecMenuHideMenuTree = SrcTecMenuHideMenuTree
	this.SrcTecMenuHidePar = SrcTecMenuHidePar;
	this.SrcTecMenuHideChild = SrcTecMenuHideChild;
	this.SrcTecMenuHideTitle = SrcTecMenuHideTitle;
	this.isSeeChild= false;
	this.isExpand = false;
	this.SrcTecMenuHideTimer = null;

	this.SrcTecMenuchildOverlap = (SrcTecMenuperCentOver != null) ? ((SrcTecMenuperCentOver/100) * this.selfWidth) : SrcTecMenuchildOverlap;
	this.ItemNow = null;
	this.SrcTecMenuHideElement = SrcTecMenuHideElement;
		
	if (hasParent) {
		this.selfParent = true;
		this.ParentMenu = openCont;
		if (SrcTecMenuNS) {
			this.PreviewItem = openItem;
			this.PreviewItem.child = this;
		}
	}
	else {
		this.selfParent = false;
	}

	if (SrcTecMenuNS) {
		this.bgColor = this.selfBorderColor;
		this.fullHeight = this.NextItem.top + this.NextItem.clip.bottom + arrayLay[0]+arrayLay[7];
		this.clip.right = this.selfWidth+arrayLay[10]+arrayLay[13];
		this.clip.bottom = this.fullHeight;
	}
	else {
		with (this.style) {
			width = this.selfWidth;
			borderWidth = arrayLay[0];
			borderColor = this.selfBorderColor;
			borderStyle = arrayLay[2];


			zIndex = topZ;
		}

		
		this.fullHeight = this.scrollHeight;
		this.SrcTecMenuShowMenu(false);
		this.onselectstart = SrcTecMenuSelectEnd;
		this.moveTo = SrcTecMenuSetMenuPos;
		this.moveTo(0,0);
	}
}


// show the menu
function SrcTecMenuShowPop(menuName,elPara,thisobj){
	
	if(SrcTecMenuIE)
	{
	 
	 if (oldParent.id==thisobj.parentElement.id) return;
	  
         oldParent=thisobj.parentElement
     
        
	}
	
	if (SrcTecMenuNS && SrcTecMenuNSresized) SrcTecMenuBegin();
	if (!SrcTecMenuIsLoaded) return;
	
	eventElement = (SrcTecMenuNS) ? elPara.target : event.srcElement;
	if (SrcTecMenuIsClickStart && !SrcTecMenuNS) eventElement.onclick = SrcTecMenuPopUp;
	
	if (!SrcTecMenuBeCreated && !SrcTecMenuIsCreated) SrcTecMenuBegin();
	eventElement.menuName = menuName;
	
	SrcTecMenuoldimg=""
	if (SrcTecMenuNS && SrcTecMenuisSlide)
	{
		SrcTecMenuCurrent=eval(eventElement.menuName);
		if ((SrcTecMenutempObj!=null))
		{
			document.layers[SrcTecMenutempObj.id].clip.width=SrcTecMenutempCW;
			document.layers[SrcTecMenutempObj.id].clip.height=SrcTecMenutempCH;
			
		}
	
		SrcTecMenutempObj=document.layers[SrcTecMenuCurrent.id];
		SrcTecMenutempCW=SrcTecMenutempObj.clip.width;
		SrcTecMenutempCH=SrcTecMenutempObj.clip.height;
		
	}
	
	if(SrcTecMenuisSlide) 
	{
		window.clearTimeout(SrcTecMenuTimePra);SrcTecMenuTimePra = 0;
	
	}
	
	if (!SrcTecMenuIsClickStart) SrcTecMenuPopUp(menuName,elPara);
	
	if (SrcTecMenuIsClickStart && SrcTecMenuNS) 
	{
	
	SrcTecMenuPopUp(menuName,elPara);
	}
	
}

function SrcTecMenuPopUp(menuName,elPara){

	if (!SrcTecMenuIsLoaded || !SrcTecMenuIsCreated) return true;
	
	EventClass = (SrcTecMenuNS) ? elPara.type : event.type;
	
	if (SrcTecMenuIsClickStart && EventClass != "click") return true;
	
	SrcTecMenuHideMenu();
	
	eventElement = (SrcTecMenuNS) ? elPara.target : event.srcElement;
	
	SrcTecMenuCurrent = eval(eventElement.menuName);
	SrcTecMenuCurrent.selfParent = false;
	SrcTecMenuCurrent.selfMenuParent.selfChildFirst = SrcTecMenuCurrent;
	
	
	
	if (SrcTecMenuIE) MenuFrameBody = SrcTecMenuLoc.document.body;
	switch (SrcTecMenuNSFrameLog) {
		case "left":
			xIndex = (SrcTecMenuCurrent.selfLeft) ? SrcTecMenuCurrent.selfLeft : (SrcTecMenuNS) ? SrcTecMenuLoc.pageXOffset : MenuFrameBody.scrollLeft;
			yIndex = (SrcTecMenuCurrent.selfTop) ? SrcTecMenuCurrent.selfTop : (SrcTecMenuNS) ? (elPara.pageY-pageYOffset)+SrcTecMenuLoc.pageYOffset : event.clientY + MenuFrameBody.scrollTop;
			break;
		case "top":
			xIndex = (SrcTecMenuCurrent.selfLeft) ? SrcTecMenuCurrent.selfLeft : (SrcTecMenuNS) ? (elPara.pageX-pageXOffset)+SrcTecMenuLoc.pageXOffset : event.clientX + MenuFrameBody.scrollLeft;
			yIndex = (SrcTecMenuCurrent.selfTop) ? SrcTecMenuCurrent.selfTop : (SrcTecMenuNS) ? SrcTecMenuLoc.pageYOffset : MenuFrameBody.scrollTop;
			break;
		case "bottom":
			xIndex = (SrcTecMenuCurrent.selfLeft) ? SrcTecMenuCurrent.selfLeft : (SrcTecMenuNS) ? (elPara.pageX-pageXOffset)+SrcTecMenuLoc.pageXOffset : event.clientX + MenuFrameBody.scrollLeft;
			yIndex = (SrcTecMenuCurrent.selfTop) ? SrcTecMenuCurrent.selfTop : (SrcTecMenuNS) ? SrcTecMenuLoc.pageYOffset+SrcTecMenuLoc.innerHeight : MenuFrameBody.scrollTop + MenuFrameBody.clientHeight;
			break;
		case "right":
			xIndex = (SrcTecMenuCurrent.selfLeft) ? SrcTecMenuCurrent.selfLeft : (SrcTecMenuNS) ? SrcTecMenuLoc.pageXOffset+SrcTecMenuLoc.innerWidth : MenuFrameBody.scrollLeft+MenuFrameBody.clientWidth;
			yIndex = (SrcTecMenuCurrent.selfTop) ? SrcTecMenuCurrent.selfTop : (SrcTecMenuNS) ? (elPara.pageY-pageYOffset)+SrcTecMenuLoc.pageYOffset : event.clientY + MenuFrameBody.scrollTop;
			break;
	}
	
	if(SrcTecMenuIE && SrcTecMenuisSlide) {
				SrcTecMenuCurrent.clip = "rect(0 0 0 0)";
				
		}
	if(SrcTecMenuNS && SrcTecMenuisSlide) {
			         
			var tempMenu = document.layers[SrcTecMenuCurrent.id];
			menuName=SrcTecMenuCurrent.id
	
			with(tempMenu.clip) {
				
				SrcTecMenuNSCW = width;
				SrcTecMenuNSCH = height;	
				width = 0;
				height = 0;
				
			}
			

		}
		
	SrcTecMenuCurrent.moveTo(xIndex,yIndex);
	
	SrcTecMenuCurrent.MenuKeepIn()
	SrcTecMenuCurrent.isExpand = true;
	if(SrcTecMenuisFade && SrcTecMenuIE)
	{
	if (typeof(SrcTecMenuFadeEffect) == "function")
		SrcTecMenuFadeEffect(SrcTecMenuCurrent, true,SrcTecMenuFadeSteps,SrcTecMenuFadeMsec);
	else
		SrcTecMenuCurrent.SrcTecMenuShowMenu(true);
	}
	else
		SrcTecMenuCurrent.SrcTecMenuShowMenu(true);

	if((SrcTecMenuisSlide) && !SrcTecMenuisFade ) {
	
	if (!SrcTecMenuIsClickStart)
	var SlideTimer = "SrcTecMenuSlide('" + menuName + "')"; 
	else
	var SlideTimer = "SrcTecMenuSlide('" + SrcTecMenuCurrent.id + "')";
	
	SrcTecMenuTimePra = window.setTimeout(SlideTimer, 10);	
	}

	 if (SrcTecMenuNS && (SrcTecMenutempObj!=null) && SrcTecMenuisSlide)
	    {
	        SrcTecMenuCurrent.clip.width=SrcTecMenutempObj.clip.width
	        SrcTecMenuCurrent.clip.height=SrcTecMenutempObj.clip.height
	     }
	
	return false;
	
}

// set the menu visibility 
function SrcTecMenuShowMenu(on) {
	if (SrcTecMenuNS) {
		this.visibility = (on) ? "show" : "hide";
		if (SrcTecMenuKeeHiLi && this.ItemNow) {
			this.ItemNow.bgColor = this.selfBGColor;
			
			if (SrcTecNsIsFontOver) {
				with (this.ItemNow.LayerText.document) {
					write(this.ItemNow.HtmText);
					close();
				}
			}
		
		
		}
		
		
		
	}
	else {
		this.style.visibility = (on) ? "visible" : "hidden";
		if (SrcTecMenuKeeHiLi && this.ItemNow) {
			with (this.ItemNow.style) {
				backgroundColor = this.selfBGColor;
				color = this.selfFontColor;
				fontFamily=this.selfFontFam;
				fontStyle=this.selfFontSty;
				fontWeight=this.selfFontWei;
				fontSize=this.selfFontSize
			}
		}
	}
	this.ItemNow = null;
}


// maket the slide effect
function SrcTecMenuSlide(menuId) {
		var SlideTimer = "SrcTecMenuSlide('" + menuId + "')";
		var CalcuRect = '';
		var NsTempX = NstempY = 0;
		switch(SrcTecMenuAnimateDirect) {
			case 1:
				if(SrcTecMenuIE) {CalcuRect = "0 " + SrcTecMenuAnimStep + "% " + SrcTecMenuAnimStep + "% 0";}
				if(SrcTecMenuNS) {NsTempX = SrcTecMenuAnimStep; NstempY = SrcTecMenuAnimStep;}
				break;
			case 2:
				if(SrcTecMenuIE) {CalcuRect = "0 100% " + SrcTecMenuAnimStep + "% 0";}
				if(SrcTecMenuNS) {NsTempX = 100; NstempY = SrcTecMenuAnimStep;}
				break;
			case 3:
				if(SrcTecMenuIE) {CalcuRect = "0 " + SrcTecMenuAnimStep + "% 100% 0";}
				if(SrcTecMenuNS) {NsTempX = SrcTecMenuAnimStep; NstempY = 100;}
				break;
			case 0:
				if(SrcTecMenuIE) {CalcuRect = "0 100% 100% 0";}
				if(SrcTecMenuNS) {NsTempX = 100; NstempY = 100;}
				break;
		}
		if(SrcTecMenuIE) {document.all(menuId).style.clip =  "rect(" + CalcuRect + ")";}
		if(SrcTecMenuNS) {
			with(document.layers[menuId].clip) {
				width = SrcTecMenuNSCW*(NsTempX/100);
				height = SrcTecMenuNSCH*(NstempY/100);
				
				
				 
			}
		}
		SrcTecMenuAnimStep += 20;
		if(SrcTecMenuAnimStep<=100 )
			SrcTecMenuTimePra = window.setTimeout(SlideTimer,SrcTecMenuAnimSpeed)
		else {
			window.clearTimeout(SrcTecMenuTimePra);
			
			SrcTecMenuTimePra = 0;
			SrcTecMenuAnimStep = 0;
			CalcuRect = '';
			
			 if (SrcTecMenuNS && (SrcTecMenutempObj!=null))
	        	{
	        	document.layers[menuId].clip.width=SrcTecMenutempObj.clip.width
	        	document.layers[menuId].clip.height=SrcTecMenutempObj.clip.height
	        	}
		}
		
		
		
		
		
		
	}


// make the mouse over style for  the menu block	
function SrcTecMenuSetMenuOver(elPara) {
	this.isExpand = true;
	SrcTecMenuIsOverMenu = true;
	SrcTecMenuCurrent = this;
	SrcTecMenuIsOverMenu = true;
	if (this.SrcTecMenuHideTimer) clearTimeout(this.SrcTecMenuHideTimer);
}


// make the mouse out  style for  the menu block	
function SrcTecMenuSetMenuOut() {
	if (SrcTecMenuIE) {
	        
		CurrentEvent = SrcTecMenuLoc.event;
		oldParent=""
		if (CurrentEvent.srcElement.contains(CurrentEvent.toElement)) return;
		
	}
	this.isExpand = false;
	SrcTecMenuIsOverMenu = false;
	
	
	
	SrcTecMenuLoc.status = "";
	if (!SrcTecMenuClickHide) SrcTecMenuAllTimer = setTimeout("SrcTecMenuCurrent.SrcTecMenuHideMenuTree()",10);  
	
	
}


// make the mouse over style for  the item block	
function SrcTecMenuSetItemOver(){
	if (SrcTecMenuKeeHiLi) {
		if (this.Creator.ItemNow && this.Creator.ItemNow != this) {
			if (SrcTecMenuNS) {
				this.Creator.ItemNow.bgColor = this.Creator.selfBGColor;
				if (SrcTecNsIsFontOver) {
					with (this.Creator.ItemNow.LayerText.document) {
						write(this.Creator.ItemNow.HtmText)
						close();
					}
				}
			}
			else {
			  
				with (this.Creator.ItemNow.style) {
					backgroundColor = this.Creator.selfBGColor;
					color = this.Creator.selfFontColor;
					fontFamily=this.Creator.selfFontFam;
					fontStyle=this.Creator.selfFontSty;
					fontWeight=this.Creator.selfFontWei;
					fontSize=this.Creator.selfFontSize
					
					if (this.Creator.ItemNow.tagName!="IMG")
					{
					if (SrcTecMenuoldHTML!="" )
		    	     		{
		    	        
		    	                         
		    	        			
		    	        			this.Creator.ItemNow.innerHTML=SrcTecMenuoldHTML
		    	        			SrcTecMenuoldHTML=""
		    	        			
		    	       
		    	     			}
		    	     		else
				       if (this.Creator.ItemNow.innerHTML.indexOf("<img")!= -1)
				          {
				     
	                                     if (SrcTecMenuoldimg!="")
	                                     {
	                                          for (i=0;i<=this.Creator.ItemNow.children.length;i++)
		     				{
		       
		 
		     		 		if (this.Creator.ItemNow.children[i]!=null)
		      				{
		     					 if (this.Creator.ItemNow.children[i].tagName=="IMG")
		      					{
				                  this.Creator.ItemNow.children[i].src=SrcTecMenuoldimg;
				            	  SrcTecMenuoldimg=""
				            	   
				            	  }
				            	  }
				            	  }
				             }
				            
		    	     			
				   
				           }
					
				       }
				       }
				
			}
		}
	}
        	
	if (SrcTecMenuIE) {
		CurrentEvent = SrcTecMenuLoc.event;
		menuIE=eval("SrcTecMenuImg" + this.parentElement.id.substr(6));
		
		
		
		this.style.backgroundColor = this.Creator.selfBGOver;
		this.style.color = this.Creator.selfFontOver;
		this.style.fontWeight=this.Creator.selfFontWeiOver;
		this.style.fontStyle=this.Creator.selfFontStyOver;
		this.style.fontFamily=this.Creator.selfFontFamOver
		this.style.fontSize=this.Creator.selfFontSizeOver
		
		
		    
		  
		    ItemCo=this.id.substr(6)
		 if (menuIE[ItemCo-1]!="" )
		   {
		    
		    
		    
		    if (this.innerHTML.indexOf("<IMG")!= -1  )
		    {
		      
		     if (SrcTecMenuoldimg!="" || SrcTecMenuoldHTML!="")
		     {
		     if (CurrentEvent.srcElement.tagName == "SPAN" ||(this.innerHTML.indexOf("<IMG")!= -1 && this.tagName!="IMG")) return;
		     }
		    
		     for (i=0;i<=this.children[0].children.length;i++)
		     {
		       
		 
		      if (this.children[0].children[i]!=null)
		      {
		      if (this.children[0].children[i].tagName=="IMG")
		      {
		     strT=menuIE[ItemCo-1]
		     m=strT.indexOf("src")
		     oldAlign=this.children[0].children[i].align;
		     
		     h=strT.indexOf(" ",m)
		     
		     strT1=strT.substring(m+4,h)
		     
		    Cus = new Image;
		   
	            Cus.src = strT1
	           
	            SrcTecMenuoldimg=this.children[0].children[i].src
	            SrcTecMenuoldWidth=this.children[0].children[i].width
	            SrcTecMenuoldHeight=this.children[0].children[i].height
	            SrcTecMenuoldBorder=this.children[0].children[i].border
	            
		    this.children[0].children[i].src=eval("Cus"+".src");
		    
		    aindex=strT.indexOf("align");
		    bindex=strT.indexOf(" ",aindex);
		    strT2=strT.substring(aindex+6,bindex)
		    this.children[0].children[i].align=strT2
		    
		    aindex=strT.indexOf("width");
		    bindex=strT.indexOf(" ",aindex);
		    strT2=strT.substring(aindex+6,bindex)
		    this.children[0].children[i].width=strT2
		    
		    aindex=strT.indexOf("height");
		    bindex=strT.indexOf(" ",aindex);
		    strT2=strT.substring(aindex+7,bindex)
		    this.children[0].children[i].height=strT2
		    
		    aindex=strT.indexOf("border");
		    bindex=strT.indexOf(" ",aindex);
		    strT2=strT.substring(aindex+7,bindex)
		    this.children[0].children[i].border=strT2
		    
		    }
		    }
		    }
		   
		    }
		    else
		    {
		     
		     
		     
		     SrcTecMenuoldHTML=this.innerHTML
		     this.innerHTML=menuIE[ItemCo-1]+SrcTecMenuoldHTML
		     
		    
		     }
		}
	
		
	}
	else {
		this.bgColor = this.Creator.selfBGOver;
		
		if (SrcTecNsIsFontOver) {
		        
			this.LayerText.document.write(this.HtmTextOver);
			
			this.LayerText.document.close();
		}
	}

	SrcTecMenuLoc.status = this.LinkUrl;

	this.Creator.ItemNow = this;

	if (this.Creator.isSeeChild) {
		this.Creator.SrcTecMenuHideChild(this);
	}
        
	if (this.HasMore) {
		horOffset = (SrcTecMenuIsRight) ? (this.Creator.SrcTecMenuchildOverlap - this.Creator.selfWidth) : (this.Creator.selfWidth - this.Creator.SrcTecMenuchildOverlap);

		if (SrcTecMenuNS) {
			this.childX = this.Creator.left + horOffset;


			this.childY = (this.pageY+this.clip.top) + SrcTecMenuchildOffset;
		}
		else {
			this.childX = this.Creator.style.pixelLeft + horOffset;


			this.childY = this.offsetTop + this.Creator.style.pixelTop + SrcTecMenuchildOffset +this.Creator.selfBoderWid;
		}

		this.child.moveTo(this.childX,this.childY);
		this.child.MenuKeepIn();
		this.Creator.isSeeChild = true;
		this.Creator.visibleChild = this.child;
		this.child.SrcTecMenuShowMenu(true);
	}
}


// make the mouse out style for  the item block	
function SrcTecMenuSetItemOut() {
	if (SrcTecMenuIE) {
		CurrentEvent = SrcTecMenuLoc.event;
	       
	    
	  
	   
			
	if(CurrentEvent.toElement!=null)
	{	
    	if (CurrentEvent.srcElement.contains(CurrentEvent.toElement)|| (CurrentEvent.fromElement.tagName=="IMG" && CurrentEvent.toElement.contains(CurrentEvent.fromElement)))
               return;
         }      
               if (this.innerHTML.indexOf("<IMG")!= -1 && SrcTecMenuoldHTML=="" )
		         {
				
	                    if (SrcTecMenuoldimg!="")
	                    {
	                    
	                    
	                      for (i=0;i<=this.children.length;i++)
		     		{
		       
		 
		     		 if (this.children[0].children[i]!=null)
		      		{
		     		 if (this.children[0].children[i].tagName=="IMG")
		      		{
	                   this.children[0].children[i].src=SrcTecMenuoldimg
	                   this.children[0].children[i].width=SrcTecMenuoldWidth
	                   this.children[0].children[i].height=SrcTecMenuoldHeight
	                   this.children[0].children[i].border=SrcTecMenuoldBorder
	                   this.children[0].children[i].align=oldAlign;
	                   oldAlign=""
	                   SrcTecMenuoldimg=""
	                   SrcTecMenuoldWidth=""
	                   SrcTecMenuoldHeight=""
	                   SrcTecMenuoldBorder=""
	                   
	                 
	                   }
	                   }
	                   }
	                   
	                   
		    		} 
		    	   
		        }
		      
			this.style.backgroundColor = this.Creator.selfBGColor;
			this.style.color = this.Creator.selfFontColor;
			this.style.fontFamily=this.Creator.selfFontFam;
			this.style.fontWeight=this.Creator.selfFontWei;
			this.style.fontStyle=this.Creator.selfFontSty;
			this.style.fontSize=this.Creator.selfFontSize
			 
		
	  if (SrcTecMenuoldHTML!="")
	   {
              
	      
		    this.innerHTML=SrcTecMenuoldHTML
		    
	            
		    SrcTecMenuoldHTML=""
		   
		
	   }

		
		if (!SrcTecMenuKeeHiLi) {
			this.style.backgroundColor = this.Creator.selfBGColor;
			this.style.color = this.Creator.selfFontColor;
			this.style.fontFamily=this.Creator.selfFontFam;
			this.style.fontWeight=this.Creator.selfFontWei;
			this.style.fontStyle=this.Creator.selfFontSty;
			this.style.fontSize=this.Creator.selfFontSize
			 
			
		}
	}
	else {
		
			this.bgColor = this.Creator.selfBGColor;
			if (SrcTecNsIsFontOver) {
				with (this.LayerText.document) {
					write(this.HtmText);
					close();
				}
			}
	
		if (!SrcTecMenuIsOverMenu && !SrcTecMenuClickHide) {
			SrcTecMenuAllTimer = setTimeout("SrcTecMenuCurrent.SrcTecMenuHideMenuTree()",10); 
		}
	}
	
}


// reset the menu position
function SrcTecMenuSetMenuPos(xIndex,yIndex) {
	this.style.pixelLeft = xIndex;
	this.style.pixelTop = yIndex;
}


 
//keep menu in browser visible rectangle
function SrcTecMenuKeepIn() {
	upperSize =SrcTecMenuKeepUpper;
	bottomSize = (SrcTecMenuInFrames && SrcTecMenuNSFrameLog=="bottom") ? (this.Creator.selfBoderWid*2) : upperSize;
	rightSize = (SrcTecMenuInFrames && SrcTecMenuNSFrameLog=="right") ? (this.Creator.selfBoderWid*2) : upperSize;
	if (SrcTecMenuNS) {
		menuFrameLeft = (SrcTecMenuLoc.pageXOffset + SrcTecMenuLoc.innerWidth) - rightSize;
		rightPosition = this.left + this.selfWidth;
   
		if (rightPosition > menuFrameLeft) {
			if (this.selfParent) {
				parentLeftPos = this.ParentMenu.left;
				LeftReCalcu = ((parentLeftPos-this.selfWidth) + this.SrcTecMenuchildOverlap);
				this.left = LeftReCalcu;
			}
			else {
				posResize = rightPosition - menuFrameLeft;
				this.left -=posResize ;
			}
		}

		menuFrameBottom = (SrcTecMenuLoc.pageYOffset + SrcTecMenuLoc.innerHeight) - bottomSize ;
		bottomPosition = this.top + this.fullHeight;

		if (bottomPosition > menuFrameBottom) {
			posResize = bottomPosition - menuFrameBottom;
			this.top -= posResize;
		}
		
		menuFrameLeft = SrcTecMenuLoc.pageXOffset;
		leftPosition = this.left;

		if (leftPosition < menuFrameLeft) {
			if (this.selfParent) {
				parentLeftPos = this.ParentMenu.left;
				LeftReCalcu = ((parentLeftPos+this.selfWidth) - this.SrcTecMenuchildOverlap);
				this.left = LeftReCalcu;
			}
			else {
				this.left = 5;
			}
		}
	}
	else {
    	menuFrameLeft = (SrcTecMenuLoc.document.body.scrollLeft + SrcTecMenuLoc.document.body.clientWidth) - rightSize;
		rightPosition = this.style.pixelLeft + this.selfWidth;
	
		if (rightPosition > menuFrameLeft) {
			if (this.selfParent) {
				parentLeftPos = this.ParentMenu.style.pixelLeft;
				LeftReCalcu = ((parentLeftPos - this.selfWidth) + this.SrcTecMenuchildOverlap);
				this.style.pixelLeft = newLeftmenuWidth;
			}
			else {
				posResize = rightPosition - menuFrameLeft;
				this.style.pixelLeft -= posResize;
			}
		}

		menuFrameBottom = (SrcTecMenuLoc.document.body.scrollTop + SrcTecMenuLoc.document.body.clientHeight) - bottomSize;
		bottomPosition = this.style.pixelTop + this.fullHeight;

		if (bottomPosition > menuFrameBottom) {
			posResize = bottomPosition - menuFrameBottom;
			this.style.pixelTop -= posResize;
		}
		
		menuFrameLeft = SrcTecMenuLoc.document.body.scrollLeft;
		leftPosition = this.style.pixelLeft;

		if (leftPosition < menuFrameLeft) {
			if (this.selfParent) {
				parentLeftPos = this.ParentMenu.style.pixelLeft;
				LeftReCalcu = ((parentLeftPos+this.selfWidth) - this.SrcTecMenuchildOverlap);
				this.style.pixelLeft = LeftReCalcu;
			}
			else {
				this.style.pixelLeft = 5;
			}
		}
	}
}

function SrcTecMenuHidePop(menuName,elPara,thisobj){
		
	if(SrcTecMenuIE)
	{
	
		
         if (oldParent.id==thisobj.parentElement.id) return;
         
	  oldParent=""
         
	}
	
	
		
	if (!SrcTecMenuIsLoaded || !SrcTecMenuIsCreated) return;
	whichEl = eval(menuName);
	whichEl.isExpand = false;
	if (!SrcTecMenuClickHide) 
	{
	whichEl.SrcTecMenuHideTitle();
	}
}

// hide the menu block

function SrcTecMenuHideMenu() {
	
	
	
	for(i=1; i<SrcTecMenuTopCount; i++) {
		tempLarObj = eval("MenuId" + i + ".selfChildFirst");
		tempLarObj.isExpand = false;
		if (tempLarObj.isSeeChild) tempLarObj.SrcTecMenuHideChild();
		
		if (SrcTecMenuIE && SrcTecMenuisFade)
		{
		if (typeof(SrcTecMenuFadeEffect) == "function")
		{
			
			
			SrcTecMenuFadeEffect(tempLarObj, false,SrcTecMenuFadeSteps,SrcTecMenuFadeMsec);
			
			if (SrcTecMenuKeeHiLi && tempLarObj.ItemNow) {
			with (tempLarObj.ItemNow.style) {
				backgroundColor = tempLarObj.selfBGColor;
				color = tempLarObj.selfFontColor;
				fontFamily=tempLarObj.selfFontFam;
			        fontWeight=tempLarObj.selfFontWei;
			        fontStyle=tempLarObj.selfFontSty;
			        fontSize=tempLarObj.selfFontSize
			}
			
			}
			
			
		}
		else
			tempLarObj.SrcTecMenuShowMenu(false);
		}
		else
		tempLarObj.SrcTecMenuShowMenu(false);
		
		
		
	}	
	
}

function SrcTecMenuHideMenuTree() { 
	SrcTecMenuAllTimer = null;
	
	if (SrcTecMenuIsOverMenu) return;
	if (this.isSeeChild) {
		this.SrcTecMenuHideChild();
	}
	this.SrcTecMenuHidePar();
	
}

function SrcTecMenuHideTitle() {
	whichTop = this;
	
	
	if (SrcTecMenuClickHide)
         whichTop.SrcTecMenuHideElement()
         else
         {  
         
        this.SrcTecMenuHideTimer = setTimeout("if(whichTop.SrcTecMenuHideElement)whichTop.SrcTecMenuHideElement()",SrcTecMenuInnerTimer);
	}
}

function SrcTecMenuHideElement() {
	this.SrcTecMenuHideTimer = null;
	
	
	if (!this.isExpand && !SrcTecMenuIsOverMenu) { 
	       
		if (SrcTecMenuIE && SrcTecMenuisFade)
		{
		if (typeof(SrcTecMenuFadeEffect) == "function")
		{
			SrcTecMenuFadeEffect(this, false,SrcTecMenuFadeSteps,SrcTecMenuFadeMsec);
			if (SrcTecMenuKeeHiLi && this.ItemNow) {
			with (this.ItemNow.style) {
				backgroundColor = this.selfBGColor;
				color = this.selfFontColor;
			fontFamily=this.selfFontFam;
			fontWeight=this.selfFontWei;
			fontStyle=this.selfFontSty;
			fontSize=this.selfFontSize
			}
			}
		}	
			
		else
			this.SrcTecMenuShowMenu(false);
		}
		else
		this.SrcTecMenuShowMenu(false);
	
	      
	}
	
	 
	
}

function SrcTecMenuHidePar() {
	tempMenu = this;
	while (tempMenu.selfParent) {
		
		
		if (SrcTecMenuIE && SrcTecMenuisFade)
		{
		if (typeof(SrcTecMenuFadeEffect) == "function")
		{
			
			
			SrcTecMenuFadeEffect(tempMenu, false,SrcTecMenuFadeSteps,SrcTecMenuFadeMsec);
			
			if (SrcTecMenuKeeHiLi && tempMenu.ItemNow) {
			with (tempMenu.ItemNow.style) {
				backgroundColor = tempMenu.selfBGColor;
				color = tempMenu.selfFontColor;
			fontFamily=tempMenu.selfFontFam;
			fontWeight=tempMenu.selfFontWei;
			fontStyle=tempMenu.selfFontSty;
			fontSize=tempMenu.selfFontSize
			}
			}
			
			
		}
		else
			tempMenu.SrcTecMenuShowMenu(false);
		}
		else
		tempMenu.SrcTecMenuShowMenu(false);
		
		tempMenu.ParentMenu.isExpand = false;		
		tempMenu = tempMenu.ParentMenu;
	}
	tempMenu.SrcTecMenuHideTitle();
}

function SrcTecMenuHideChild(item) {
	tempMenu = this.visibleChild;
	while (tempMenu.isSeeChild) {
		
		if (SrcTecMenuIE && SrcTecMenuisFade)
		{
		if (typeof(SrcTecMenuFadeEffect) == "function")
		{
			
			
			SrcTecMenuFadeEffect(tempMenu.visibleChild, false,SrcTecMenuFadeSteps,SrcTecMenuFadeMsec);
			
			if (SrcTecMenuKeeHiLi && tempMenu.visibleChild.ItemNow) {
			with (tempMenu.visibleChild.ItemNow.style) {
				backgroundColor = tempMenu.visibleChild.selfBGColor;
				color = tempMenu.visibleChild.selfFontColor;
				fontFamily=tempMenu.selfFontFam;
			fontWeight=tempMenu.selfFontWei;
			fontStyle=tempMenu.selfFontSty;
			fontSize=tempMenu.selfFontSize
			}
			}
			
			
		}
		else
			tempMenu.visibleChild.SrcTecMenuShowMenu(false);
		}
		else
		tempMenu.visibleChild.SrcTecMenuShowMenu(false);
		
		tempMenu.isSeeChild = false;
		tempMenu = tempMenu.visibleChild;
	}

	if (!this.isExpand || !Item.HasMore || this.visibleChild != this.child) {
		
		
		
		if (SrcTecMenuIE && SrcTecMenuisFade)
		{
		if (typeof(SrcTecMenuFadeEffect) == "function")
		{
			
			
			SrcTecMenuFadeEffect(this.visibleChild, false,SrcTecMenuFadeSteps,SrcTecMenuFadeMsec);
			
			if (SrcTecMenuKeeHiLi && this.visibleChild.ItemNow) {
			with (this.visibleChild.ItemNow.style) {
				backgroundColor = this.visibleChild.selfBGColor;
				color = this.visibleChild.selfFontColor;
				fontFamily=this.visibleChild.selfFontFam;
			fontWeight=this.visibleChild.selfFontWei;
			fontStyle=this.visibleChild.selfFontSty;
			fontSize=this.visibleChild.selfFontSize
			}
			}
			
			
		}
		else
			this.visibleChild.SrcTecMenuShowMenu(false);
		}
		else
		this.visibleChild.SrcTecMenuShowMenu(false);
		
		this.isSeeChild = false;
	}
}

function SrcTecMenuSelectEnd(){return false}

function SrcTecMenuRpeate(){
	if (SrcTecMenuLoader.innerWidth==SrcTecMenuOrigWidth && SrcTecMenuLoader.innerHeight==SrcTecMenuOrigHeight) return;
	SrcTecMenuInit();
	SrcTecMenuNSresized=true;
	SrcTecMenuLoc.location.reload();
}

function SrcTecMenuClick() {
	if (!SrcTecMenuIsOverMenu && SrcTecMenuCurrent!=null && !SrcTecMenuCurrent.isExpand) {
		ElPara = SrcTecMenuCurrent;
		ElPara.SrcTecMenuHideMenuTree();
	}
}

window.onerror = SrcTecMenuErrReport;

function SrcTecMenuErrReport(){
	arAccessErrors = ["permission","access"];
	mess = arguments[0].toLowerCase();
	found = false;
	for (i=0;i<arAccessErrors.length;i++) {
		errStr= arAccessErrors[i];
		if (mess.indexOf(errStr)!=-1) found = true;
	}
	return found;
}


// make the fade effect.
function SrcTecMenuFadeEffect(fadeel, fadeInde, diffs, times) {

	if (diffs == null) diffs =diffs ;
	if (times == null) times = times;

	if (fadeel.stepIndex== null)
		fadeel.stepIndex = SrcTecMenuFadeStepArray.length;
	SrcTecMenuFadeStepArray[fadeel.stepIndex] = fadeel;
	
	if (fadeel.fadeStepNumber == null) {
		if (fadeel.style.visibility == "hidden")
			fadeel.fadeStepNumber = 0;
		else
			fadeel.fadeStepNumber = diffs;
		if (fadeInde)
			fadeel.style.filter = "Alpha(Opacity=0)";
		else
			fadeel.style.filter = "Alpha(Opacity=100)";
	}
			
	window.setTimeout("SrcTecMenuFadeCallBack(" + fadeInde + "," + fadeel.stepIndex+ "," + diffs + "," + times + ")", times);
}

function SrcTecMenuFadeCallBack(fadeInde, index, diffs, times) {	
	fadeel = SrcTecMenuFadeStepArray[index];
	
	c = fadeel.fadeStepNumber;
	if (fadeel.fadeTimer != null)
		window.clearTimeout(fadeel.fadeTimer);
	if ((c == 0) && (!fadeInde)) {			
		fadeel.style.visibility = "hidden";		
		return;
	}
	else if ((c==diffs) && (fadeInde)) {	
		fadeel.style.filter = "";
		fadeel.style.visibility = "visible";
		return;
	}
	else {
		(fadeInde) ? 	c++ : c--;
		fadeel.style.visibility = "visible";
		fadeel.style.filter = "Alpha(Opacity=" + 100*c/diffs + ")";

		fadeel.fadeStepNumber = c;
		fadeel.fadeTimer = window.setTimeout("SrcTecMenuFadeCallBack(" + fadeInde + "," + index + "," + diffs + "," + times + ")", times);
	}
}

function SrcTecMenuDocumentClick()
{
	oldParent=""
	SrcTecMenuHideMenu()
}

if (SrcTecMenuIE && document.all != null && SrcTecMenuClickHideBlock) {

document.onclick = SrcTecMenuDocumentClick

}