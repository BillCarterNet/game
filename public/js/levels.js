const levelStructure = [
    {
        name: 'block1',
        struct: [
            'NNNNN',
            'BNNNB',
            'BBNBB',
            'BBNBB',
            'BNNNB',
        ]
    },
    {
        name: 'block2',
        struct: [
            'BNNNB',
            'BNNNB',
            'NNNNN',
            'NNNNB',
            'NHHNN',
        ]
    },    
    {
        name: 'block3',
        struct: [
            'NNNNN',
            'NNHNN',
            'NHHHN',
            'NNHNN',
            'NNNNN',
        ]
    },
    {
        name: 'block4',
        struct: [
            'BBBBN',
            'NBBBN',
            'NNBNN',
            'NNNNN',
            'NNNNN',
        ]
    },

];

let levels = {

    eMapNameForLevel: function(level) {

        switch (level) {
            case 1:
                return 'arid';
            case 2:
                return 'wood';
            case 3:
                return 'space';
        }
    
    },
    
    eMapFormatForLevel: function(level) {
    
        switch (level) {
            case 1:
                return 'png';
            case 2:
                return 'jpg';
            case 3:
                return 'png';
        }
    
    },

    getSection: function(i) {

        return levelStructure[i].struct;

    }

};

export {levels}