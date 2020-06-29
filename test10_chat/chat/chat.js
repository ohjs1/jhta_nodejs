var chat = {
    users: [], //접속자명단
    rooms: [], //방목록
    addUser: function(nickname) { //전체 접속자명단에 nickname 추가하기
        this.users.push(nickname);
    },
    addRoom: function(roomname) { //방만들기
        //빈 접속자 명단을 배열로 갖는 방을 방배열에 추가하기
        this.rooms.push({roomname:roomname, attendants:[]});
    },
    getRoomList: function() { //방면록 얻어오기
        var roomnames = this.rooms.map( function(element) {
            return element.roomname;
        });
        return roomnames;
    },
    joinRoom: function(roomname, nickname) { //방에 입장하기
        //filter함수 : 리턴된값이 true 인 값들만 배열에 저장한다. 
        var rooms = this.rooms.filter( function(element) {
            return roomname === element.roomname;
        });
        rooms[0].attendants.push(nickname);
    },
    //방이름을 파라미터로 전달받아 방의 참석자 명단(attendants)를 리턴하는 메소드
    getAttendants: function(roomname) {
        var rooms = this.rooms.filter( function(element) {
            return roomname === element.roomname;
        });
        return rooms[0].attendants;
    }
};
module.exports = chat;