var veiw = new Vue
({
  el: '#input',
  data: 
  {
    name: "",
    reflex: 0,
    action: "",
    message: 'Hello Vue!',
    char: [],
    error: false,
    error_text: "",
    position: 0,
    // setup, declare, action
    phase:"setup",
    phase_setup:true,
    phase_declare:false,
    phase_action:false

  },
  methods:
  {
    add_char: function()
    {
      this.reflex = parseInt(this.reflex)
      var entity = {name: this.name,reflex: this.reflex,player:true,action: "action", turn:false};
      this.char.push(entity)
    },
    add_npc: function()
    {
      var entity = {name: this.name,reflex: this.reflex,player:false,action:"action",turn:false};
      this.char.push(entity)
    },
    sortobjects: function(mode)
    {
      tempchar =  this.char

      if(this.phase_action == true)
      {
        tempchar = this.sort_down(tempchar,mode)
        //console.log("down")
      }
      else
      {
        
        tempchar = this.sort_up(tempchar,mode)
        //console.log("up")
      }

      this.char = tempchar
      // for(i = 0;i <= tempchar.length-1; i++)
      // {
      //   errorcheckerthing.push(tempchar[i].entity.reflex)
      //   //console.log(this.char[i].entity.reflex)
      // }
      this.$forceUpdate();
      //return errorcheckerthing
      //console.log(tempchar[0].entity.reflex)
    },
    sort_down: function (tempchar,mode) 
    {
      swap = true
      while(swap == true)
      {
        swap = false
        if(this.phase_action == true)
        {
          for(i = 0;i <= tempchar.length-2; i++)
          {   
            if(tempchar[i].reflex < tempchar[i+1].reflex)
            {
              //console.log("Swap")
              swap = true
              temp1 = tempchar[i]
              //console.log(temp1.entity.reflex)
              tempchar[i] = tempchar[i+1]
              tempchar[i+1] = temp1
            }
            if(tempchar[i].reflex == tempchar[i+1].reflex && mode == "swap")
            {
              console.log("swap")
              temp1 = tempchar[i]
              temp2 = tempchar[i+1]
              //console.log(temp1.entity.reflex)
              move = Math.floor(Math.random() * 2);
              if(move == 0)
              {
                //console.log(move)
                tempchar[i] = temp2
                tempchar[i+1] = temp1
              }
              else
              {
                //console.log(move)
                tempchar[i] = temp1
                tempchar[i+1] = temp2
              }
            }
          }
        }
      }
      return tempchar
    },
    sort_up: function (tempchar,mode) 
    {
      swap = true
      while(swap == true)
      {
        swap = false
        for(i = 0;i <= tempchar.length-2; i++)
        {   
          if(tempchar[i].reflex > tempchar[i+1].reflex)
          {
            console.log("Swap")
            swap = true
            temp1 = tempchar[i]
            //console.log(temp1.entity.reflex)
            tempchar[i] = tempchar[i+1]
            tempchar[i+1] = temp1
          }
          if(tempchar[i].reflex == tempchar[i+1].reflex && mode == "swap")
          {
            //console.log("mode")
            temp1 = tempchar[i]
            temp2 = tempchar[i+1]
            //console.log(temp1.entity.reflex)
            move = Math.floor(Math.random() * 2);
            if(move == 0)
            {
              //console.log(move)
              tempchar[i] = temp2
              tempchar[i+1] = temp1
            }
            else
            {
              //console.log(move)
              tempchar[i] = temp1
              tempchar[i+1] = temp2
            }
          }
        }
      }
      return tempchar
    },
    start_turn: function()
    {
      this.position = 0;
      this.set_phase("declare")
      this.set_turn(0)
      this.$forceUpdate();
    },

    next_turn: function(mode,real)
    {
  
      //console.log(real)
      
      pos = this.position
      if(mode=="-")
      {
        pos = pos-1
        if(pos < 0)
        {
          this.char = this.char.reverse()
          pos = this.char.length-1
          if(this.phase_declare == true)
          {
            this.set_phase("action")
          }
          else
          {
            this.set_phase("declare")
          }
        }

      }
      else
      {
        pos = pos+1
        if(pos > this.char.length-1)
        {
          this.char = this.char.reverse()
          pos = 0
            if(this.phase_declare == true)
            {
              this.set_phase("action")
            }
            else
            {
              this.set_phase("declare")
            }
        }
     }
      this.set_turn(pos)
      this.position = pos
      this.$forceUpdate();


    },

    set_turn: function(value)
    {
      tempchar =  this.char
      for(i = 0;i <= tempchar.length-1; i++)
      {
        var entity = {name: tempchar[i].name,reflex: tempchar[i].reflex,player: tempchar[i].player, action: tempchar[i].action, turn:false};
        tempchar[i] = entity
      }
      var entity = {name: tempchar[value].name,reflex: tempchar[value].reflex,player: tempchar[value].player,action: tempchar[value].action, turn:true};
      tempchar[value] = entity
      //console.log(tempchar[value])
      this.char = tempchar
    },
    set_phase: function(newphase)
    {
      this.phase_setup=false
      this.phase_declare=false
      this.phase_action=false
      
      if(newphase == "setup")
      {
        this.phase_setup=true
      }
      if(newphase == "declare")
      {
        this.phase_declare=true
      }
      if(newphase == "action")
      {
        this.phase_action=true
      }
      this.$forceUpdate();
    },
    draw_entiy: function(turn) 
    {
        var ent = ""
        if(turn == true)
        {
            ent = ent + "<span class='dot border'>"
            ent = ent + "</span>"
        }
        console.log(ent)
        return ent
    },
    rev: function()
    {
    this.char = tempchar
    tempchar = tempchar.reverse()
    this.char = tempchar  
    }
  }
})


