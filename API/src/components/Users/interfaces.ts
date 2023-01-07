export interface UsernameInterface {
    username: string;
};

interface UserInterface extends UsernameInterface {
    email: string;
    username: string;
    password: string;
};

interface UserInterfaceFromDB extends UserInterface {
    ID: number;
};

export interface UsernameInterfaceFromDB {
    id: number;
    username: string;
}

interface UserInterfaceWithRolesFromDB {
    username: string;
    roles: string[];
}

interface RentedContentInterface {
    //UserID
    //MovieID
    //TVSeriesID
    beginningTime: string;
    endTime: string;
    amountPaid: number;
};

export { UserInterface, RentedContentInterface, UserInterfaceFromDB, UserInterfaceWithRolesFromDB };
