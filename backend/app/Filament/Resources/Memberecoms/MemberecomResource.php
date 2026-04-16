<?php

namespace App\Filament\Resources\Memberecoms;

use App\Filament\Resources\Memberecoms\Pages\CreateMemberecom;
use App\Filament\Resources\Memberecoms\Pages\EditMemberecom;
use App\Filament\Resources\Memberecoms\Pages\ListMemberecoms;
use App\Filament\Resources\Memberecoms\Schemas\MemberecomForm;
use App\Filament\Resources\Memberecoms\Tables\MemberecomsTable;
use App\Models\Memberecom;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class MemberecomResource extends Resource
{
    protected static ?string $model = Memberecom::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUsers;

    protected static ?string $recordTitleAttribute = 'name';

    // ✅ CHANGE LABEL (IMPORTANT)
    protected static ?string $navigationLabel = 'Customers';
    protected static ?string $pluralModelLabel = 'Customers';
    protected static ?string $modelLabel = 'Customer';

    // ✅ GROUP (eCommerce)
    protected static string|\UnitEnum|null $navigationGroup = 'eCommerce Panel';

    // ✅ ORDER (1st in eCommerce)
    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return MemberecomForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return MemberecomsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListMemberecoms::route('/'),
            'create' => CreateMemberecom::route('/create'),
            'edit' => EditMemberecom::route('/{record}/edit'),
        ];
    }
}