<?php

namespace App\Filament\Resources\ShoppeeMembers;


use App\Filament\Resources\ShoppeeMembers\Pages\ListShoppeeMembers;
use App\Filament\Resources\ShoppeeMembers\Pages\ViewShoppeeMember;
use App\Filament\Resources\ShoppeeMembers\Schemas\ShoppeeMemberForm;
use App\Filament\Resources\ShoppeeMembers\Schemas\ShoppeeMemberInfolist;
use App\Filament\Resources\ShoppeeMembers\Tables\ShoppeeMembersTable;
use App\Models\Shoppee_Member;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ShoppeeMemberResource extends Resource
{
    protected static ?string $model = Shoppee_Member::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUsers;

    protected static ?string $recordTitleAttribute = 'fullname';
    protected static string|UnitEnum|null $navigationGroup = 'Shoppe Panel';

protected static ?string $navigationLabel = 'Members';


protected static ?string $pluralLabel = 'Members';

protected static ?string $modelLabel = 'Members';

    public static function form(Schema $schema): Schema
    {
        return ShoppeeMemberForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return ShoppeeMemberInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ShoppeeMembersTable::configure($table);
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
            'index' => ListShoppeeMembers::route('/'),
            
            'view' => ViewShoppeeMember::route('/{record}'),
           
        ];
    }
}
